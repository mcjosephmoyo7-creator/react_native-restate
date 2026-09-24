import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import ScreenHeader from "@/components/ScreenHeader";
import images from "@/constants/images";
import { updateUserProfile } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useI18n } from "@/lib/i18n";

const EditProfile = () => {
  const { user, refetch } = useGlobalContext();
  const { t } = useI18n();
  const [name, setName] = useState(user?.name ?? "");
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [saving, setSaving] = useState(false);

  const imageUri = selectedImage?.uri ?? user?.avatar;

  const choosePhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(t("common_error"), t("profile_photoPermission"));
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch {
      Alert.alert(t("common_error"), t("profile_photoError"));
    }
  };

  const saveProfile = async () => {
    if (saving) return;

    const normalizedName = name.trim();

    if (!normalizedName) {
      Alert.alert(t("common_error"), t("profile_nameRequired"));
      return;
    }

    if (normalizedName === user?.name && !selectedImage) {
      Alert.alert(t("common_success"), t("profile_noChanges"));
      return;
    }

    if (selectedImage && selectedImage.fileSize === undefined) {
      Alert.alert(t("common_error"), t("profile_photoError"));
      return;
    }

    setSaving(true);

    try {
      await updateUserProfile({
        name: normalizedName,
        image: selectedImage
          ? {
              uri: selectedImage.uri,
              fileName: selectedImage.fileName || "profile-image.jpg",
              mimeType: selectedImage.mimeType || "image/jpeg",
              size: selectedImage.fileSize ?? 0,
            }
          : undefined,
      });
      await refetch();

      Alert.alert(t("common_success"), t("profile_updated"), [
        {
          text: t("common_confirm"),
          onPress: () => router.back(),
        },
      ]);
    } catch {
      Alert.alert(t("common_error"), t("profile_updateError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-16 px-5"
      >
        <ScreenHeader
          title={t("profile_editTitle")}
          subtitle={t("profile_editSubtitle")}
        />

        <View className="items-center mt-8">
          <Text className="text-sm font-rubik-medium text-black-300 mb-3">
            {t("profile_photo")}
          </Text>
          <TouchableOpacity
            onPress={choosePhoto}
            activeOpacity={0.8}
            className="relative"
          >
            <Image
              source={imageUri ? { uri: imageUri } : images.avatar}
              className="size-36 rounded-full"
            />
            <View className="absolute bottom-1 right-1 size-10 rounded-full bg-primary-300 border-4 border-white items-center justify-center">
              <Feather name="camera" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={choosePhoto}
            className="mt-4 rounded-full bg-primary-100 px-4 py-2"
          >
            <Text className="text-sm font-rubik-medium text-primary-300">
              {t("profile_changePhoto")}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <Text className="text-sm font-rubik-medium text-black-300">
            {t("profile_name")}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t("profile_namePlaceholder")}
            placeholderTextColor="#8C8E98"
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={saveProfile}
            className="mt-2 bg-accent-100 border border-primary-100 rounded-xl px-4 py-3.5 font-rubik text-base text-black-300"
          />
        </View>

        <TouchableOpacity
          onPress={saveProfile}
          disabled={saving}
          activeOpacity={0.8}
          className={`bg-primary-300 rounded-xl py-4 items-center justify-center mt-7 ${
            saving ? "opacity-60" : ""
          }`}
        >
          {saving ? (
            <View className="flex flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text className="text-sm font-rubik-medium text-white">
                {t("profile_saving")}
              </Text>
            </View>
          ) : (
            <Text className="text-sm font-rubik-bold text-white">
              {t("profile_save")}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
