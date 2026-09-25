import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  OAuthProvider,
  Permission,
  Query,
  Role,
  Storage,
} from "react-native-appwrite";

import { getPropertyById as findPropertyById, properties } from "./data";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

/**
 * The Appwrite client is created at module scope, so it must be safe to import
 * before the environment has been configured (for example, while Expo Router
 * is discovering routes).
 */
export const isAppwriteConfigured = Boolean(
  config.endpoint && config.projectId
);

export const client = new Client();

if (config.endpoint) {
  client.setEndpoint(config.endpoint);
}

if (config.projectId) {
  client.setProject(config.projectId);
}

client.setPlatform(config.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

interface CurrentUser {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

export async function completeOAuthSession(userId: string, secret: string) {
  if (!isAppwriteConfigured) {
    throw new Error("Appwrite is not configured.");
  }

  await account.createSession(userId, secret);
  await syncProfile();
}

export async function login() {
  if (!isAppwriteConfigured) {
    console.error(
      "Appwrite is not configured. Add EXPO_PUBLIC_APPWRITE_ENDPOINT and EXPO_PUBLIC_APPWRITE_PROJECT_ID to .env.local, then restart Expo."
    );
    return false;
  }

  try {
    const redirectUri = Linking.createURL("auth");

    const loginUrl = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri,
      redirectUri
    );

    if (!loginUrl) return false;

    const result = await WebBrowser.openAuthSessionAsync(
      loginUrl.toString(),
      redirectUri
    );

    if (result.type !== "success" || !result.url) return false;

    const url = new URL(result.url);
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");

    if (!userId || !secret) return false;

    await completeOAuthSession(userId, secret);

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

async function syncProfile() {
  try {
    const acc = await account.get();
    const session = await account.getSession("current");

    let name = acc.name;
    let email = acc.email;
    let avatar = "";

    if (session.provider === OAuthProvider.Google && session.providerAccessToken) {
      const profile = await fetchGoogleProfile(session.providerAccessToken);
      if (profile) {
        if (profile.name) name = profile.name;
        if (profile.email) email = profile.email;
        if (profile.picture) avatar = profile.picture;
      }
    }

    await persistProfile(acc.$id, name, email, avatar);
  } catch (error) {
    console.warn("Failed to sync profile:", error);
  }
}

async function fetchGoogleProfile(accessToken: string) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function persistProfile(
  userId: string,
  name: string,
  email: string,
  avatar: string
) {
  if (!config.databaseId || !config.usersCollectionId) return;

  try {
    const existing = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId,
      [Query.equal("appwriteUserId", userId)]
    );

    if (existing.documents.length > 0) return;

    await databases.createDocument(
      config.databaseId!,
      config.usersCollectionId,
      ID.unique(),
      { appwriteUserId: userId, name, email, avatar }
    );
  } catch (error) {
    console.warn("Failed to persist profile:", error);
  }
}

export interface ProfileImageUpload {
  uri: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export async function updateUserProfile({
  name,
  image,
}: {
  name?: string;
  image?: ProfileImageUpload;
}) {
  if (!isAppwriteConfigured) {
    throw new Error("Appwrite is not configured.");
  }

  if (!config.databaseId || !config.usersCollectionId) {
    throw new Error("The users collection is not configured.");
  }

  const normalizedName = name?.trim();
  if (name !== undefined && !normalizedName) {
    throw new Error("Name is required.");
  }

  if (image && !config.bucketId) {
    throw new Error("The profile image bucket is not configured.");
  }

  const currentAccount = await account.get();
  const existing = await databases.listDocuments(
    config.databaseId,
    config.usersCollectionId,
    [Query.equal("appwriteUserId", currentAccount.$id)]
  );
  const currentProfile = existing.documents[0];
  let uploadedFileId: string | null = null;
  let avatar = currentProfile?.avatar || "";

  try {
    if (normalizedName && normalizedName !== currentAccount.name) {
      await account.updateName(normalizedName);
    }

    if (image) {
      const file = await storage.createFile(
        config.bucketId!,
        ID.unique(),
        {
          name: image.fileName,
          type: image.mimeType,
          size: image.size,
          uri: image.uri,
        },
        [Permission.read(Role.any())]
      );
      uploadedFileId = file.$id;
      avatar = storage.getFileView(config.bucketId!, file.$id).toString();
    }

    const profileData = {
      name: normalizedName || currentAccount.name,
      email: currentProfile?.email || currentAccount.email,
      avatar,
    };

    if (currentProfile) {
      await databases.updateDocument(
        config.databaseId,
        config.usersCollectionId,
        currentProfile.$id,
        profileData
      );
    } else {
      await databases.createDocument(
        config.databaseId,
        config.usersCollectionId,
        ID.unique(),
        { appwriteUserId: currentAccount.$id, ...profileData }
      );
    }
  } catch (error) {
    if (uploadedFileId) {
      try {
        await storage.deleteFile(config.bucketId!, uploadedFileId);
      } catch {
        // The profile update error is more useful to show than cleanup failure.
      }
    }
    throw error;
  }

  const updatedUser = await getCurrentUser();
  if (!updatedUser) {
    throw new Error("Could not reload the updated profile.");
  }

  return updatedUser;
}

export async function logout() {
  if (!isAppwriteConfigured) return false;

  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isAppwriteConfigured) return null;

  let acc;

  try {
    acc = await account.get();
  } catch {
    return null;
  }

  const user: CurrentUser = {
    $id: acc.$id,
    name: acc.name,
    email: acc.email,
    avatar: avatars.getInitials(acc.name).toString(),
  };

  if (!config.databaseId || !config.usersCollectionId) return user;

  try {
    const list = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId,
      [Query.equal("appwriteUserId", acc.$id)]
    );

    const doc = list.documents[0];
    if (doc) {
      if (doc.name) user.name = doc.name;
      if (doc.email) user.email = doc.email;
      if (doc.avatar) user.avatar = doc.avatar;
    }
  } catch (error) {
    console.warn("Could not read profile from database:", error);
  }

  return user;
}

export async function getLatestProperties() {
  return [...properties]
    .sort(
      (a, b) =>
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    )
    .slice(0, 5);
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  let list = [...properties].sort(
    (a, b) =>
      new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
  );

  if (filter && filter !== "All") {
    list = list.filter((property) => property.type === filter);
  }

  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (property) =>
        property.name.toLowerCase().includes(q) ||
        property.address.toLowerCase().includes(q) ||
        property.type.toLowerCase().includes(q)
    );
  }

  if (limit) {
    list = list.slice(0, limit);
  }

  return list;
}

export async function getPropertyById({ id }: { id: string }) {
  return findPropertyById(id);
}