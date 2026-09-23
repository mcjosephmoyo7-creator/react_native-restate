import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ScreenHeader from "@/components/ScreenHeader";
import { useI18n, TranslationKey } from "@/lib/i18n";

interface NotificationOption {
  key: string;
  title: string;
  titleKey: TranslationKey;
  description: string;
  descriptionKey: TranslationKey;
  defaultValue: boolean;
}

interface NotificationGroup {
  title: string;
  titleKey: TranslationKey;
  icon: React.ComponentProps<typeof Feather>["name"];
  options: NotificationOption[];
}

const notificationGroups: NotificationGroup[] = [
  {
    title: "Property Alerts",
    titleKey: "notifications_groupProperty",
    icon: "home",
    options: [
      {
        key: "newAlerts",
        title: "New Property Alerts",
        titleKey: "notif_newAlerts",
        description:
          "Get notified when new listings that match your search are added.",
        descriptionKey: "notif_newAlertsDesc",
        defaultValue: true,
      },
      {
        key: "priceDrops",
        title: "Price Drops & Deals",
        titleKey: "notif_priceDrops",
        description:
          "Be the first to know about price reductions, promos and special offers.",
        descriptionKey: "notif_priceDropsDesc",
        defaultValue: true,
      },
    ],
  },
  {
    title: "Bookings & Payments",
    titleKey: "notifications_groupBooking",
    icon: "calendar",
    options: [
      {
        key: "bookingReminders",
        title: "Booking Reminders",
        titleKey: "notif_bookingReminders",
        description:
          "Reminders for upcoming viewings, deposits and move-in dates.",
        descriptionKey: "notif_bookingRemindersDesc",
        defaultValue: true,
      },
      {
        key: "paymentUpdates",
        title: "Payment Updates",
        titleKey: "notif_paymentUpdates",
        description:
          "Instant updates on payment confirmations, receipts and failures.",
        descriptionKey: "notif_paymentUpdatesDesc",
        defaultValue: true,
      },
    ],
  },
  {
    title: "App Updates",
    titleKey: "notifications_groupApp",
    icon: "settings",
    options: [
      {
        key: "appUpdates",
        title: "App Updates & Offers",
        titleKey: "notif_appUpdates",
        description:
          "Product updates, new features and exclusive app-only offers.",
        descriptionKey: "notif_appUpdatesDesc",
        defaultValue: false,
      },
    ],
  },
];

const initialStates = () => {
  const state: Record<string, boolean> = {};
  notificationGroups.forEach((group) =>
    group.options.forEach((option) => (state[option.key] = option.defaultValue))
  );
  return state;
};

const Notifications = () => {
  const { t } = useI18n();
  const [preferences, setPreferences] = useState(initialStates);

  const toggle = (key: string) =>
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-24 px-5"
      >
        <ScreenHeader
          title={t("notifications_title")}
          subtitle={t("notifications_subtitle")}
        />

        <View className="mt-5 rounded-3xl bg-primary-100/60 border border-primary-100 p-4 flex flex-row items-center gap-3">
          <View className="size-11 bg-primary-300 rounded-2xl items-center justify-center">
            <Feather name="bell" size={20} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-rubik-semibold text-black-300">
              {t("notifications_stayInLoop")}
            </Text>
            <Text className="text-xs font-rubik text-black-100 leading-4">
              {t("notifications_info")}
            </Text>
          </View>
        </View>

        {notificationGroups.map((group) => (
          <View key={group.title} className="mt-6">
            <View className="flex flex-row items-center gap-2 mb-2">
              <Feather name={group.icon} size={15} color="#0061FF" />
              <Text className="text-xs font-rubik-semibold text-black-200 uppercase tracking-wide">
                {t(group.titleKey)}
              </Text>
            </View>

            <View className="bg-accent-100 rounded-2xl border border-primary-100">
              {group.options.map((option, index) => (
                <View
                  key={option.key}
                  className={`flex flex-row items-center justify-between px-4 py-4 ${
                    index > 0 ? "border-t border-primary-100" : ""
                  }`}
                >
                  <View className="flex flex-1 mr-4">
                    <Text className="text-sm font-rubik-semibold text-black-300">
                      {t(option.titleKey)}
                    </Text>
                    <Text className="text-xs font-rubik text-black-100 leading-4 mt-0.5">
                      {t(option.descriptionKey)}
                    </Text>
                  </View>
                  <Switch
                    value={preferences[option.key]}
                    onValueChange={() => toggle(option.key)}
                    trackColor={{ false: "#E4E4E7", true: "#0061FF" }}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#E4E4E7"
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        <View className="mt-8 rounded-2xl border border-primary-100 p-4 flex flex-row items-start gap-2">
          <Feather name="info" size={14} color="#8C8E98" />
          <Text className="flex-1 text-xs font-rubik text-black-100 leading-4">
            {t("notifications_footer")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;