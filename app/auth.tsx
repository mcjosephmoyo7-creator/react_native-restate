import { useEffect, useRef } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";

import { completeOAuthSession } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

const AuthCallback = () => {
  const { refetch } = useGlobalContext();
  const { userId, secret } = useLocalSearchParams<{
    userId?: string;
    secret?: string;
  }>();
  const hasStarted = useRef(false);

  useEffect(() => {
    // `openAuthSessionAsync` resolves in the original app window. On web, the
    // popup only needs to hand the callback URL back to that window.
    if (Platform.OS !== "web" || hasStarted.current) return;

    hasStarted.current = true;

    const handleCallback = async () => {
      let handedOffToParent = false;

      try {
        handedOffToParent =
          WebBrowser.maybeCompleteAuthSession({ skipRedirectCheck: true }).type ===
          "success";
      } catch {
        // A direct browser callback has no parent window. It is handled below.
      }

      if (handedOffToParent) return;

      if (!userId || !secret) {
        router.replace("/sign-in");
        return;
      }

      try {
        await completeOAuthSession(userId, secret);
        await refetch();
        router.replace("/");
      } catch {
        router.replace("/sign-in");
      }
    };

    void handleCallback();
  }, [refetch, secret, userId]);

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <ActivityIndicator size="large" color="#0061FF" />
      <Text className="mt-4 text-sm font-rubik text-black-200">
        Completing sign in...
      </Text>
    </View>
  );
};

export default AuthCallback;
