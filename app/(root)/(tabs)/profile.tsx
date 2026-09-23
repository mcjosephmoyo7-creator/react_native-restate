import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, Href } from "expo-router";

import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useI18n, TranslationKey } from "@/lib/i18n";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

const settingsRoutes: Record<string, string> = {
  "My Bookings": "/bookings",
  Payments: "/payments",
  Notifications: "/notifications",
  Security: "/security",
  Language: "/language",
  "Help Center": "/help-center",
  "Invite Friends": "/invite-friends",
};

const settingsTitleKeys: Record<string, TranslationKey> = {
  "My Bookings": "settings_bookings",
  Payments: "settings_payments",
  Notifications: "settings_notifications",
  Security: "settings_security",
  Language: "settings_language",
  "Help Center": "settings_help",
  "Invite Friends": "settings_invite",
};

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const { t } = useI18n();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert(t("common_success"), t("logout_success"));
      refetch();
    } else {
      Alert.alert(t("common_error"), t("logout_error"));
    }
  };

  const handleSettingsPress = (title: string) => {
    const route = settingsRoutes[title];
    if (route) {
      router.push(route as Href);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">{t("profile_title")}</Text>
          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image source={icons.bell} className="size-5" />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem
            icon={icons.calendar}
            title={t("settings_bookings")}
            onPress={() => handleSettingsPress("My Bookings")}
          />
          <SettingsItem
            icon={icons.wallet}
            title={t("settings_payments")}
            onPress={() => handleSettingsPress("Payments")}
          />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem
              key={index}
              {...item}
              title={
                settingsTitleKeys[item.title]
                  ? t(settingsTitleKeys[item.title])
                  : item.title
              }
              onPress={() => handleSettingsPress(item.title)}
            />
          ))}
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title={t("settings_logout")}
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
