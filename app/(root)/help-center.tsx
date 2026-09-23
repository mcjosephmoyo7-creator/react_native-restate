import { useState } from "react";
import {
  Alert,
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ScreenHeader from "@/components/ScreenHeader";
import { useI18n, TranslationKey } from "@/lib/i18n";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FaqItem {
  question: string;
  questionKey: TranslationKey;
  answer: string;
  answerKey: TranslationKey;
}

interface FaqGroup {
  title: string;
  titleKey: TranslationKey;
  icon: React.ComponentProps<typeof Feather>["name"];
  items: FaqItem[];
}

const faqGroups: FaqGroup[] = [
  {
    title: "Bookings",
    titleKey: "faq_bookings",
    icon: "calendar",
    items: [
      {
        question: "How do I cancel a property viewing?",
        questionKey: "faq_cancelQuestion",
        answer:
          "Open My Bookings, select the upcoming viewing and tap 'Cancel Booking'. Cancellations made more than 24 hours before the scheduled time are free of charge.",
        answerKey: "faq_cancelAnswer",
      },
      {
        question: "Can I reschedule a booking?",
        questionKey: "faq_rescheduleQuestion",
        answer:
          "Yes. Contact the agent from the booking details page, or reach our support team and we will reschedule the viewing to a slot that suits you.",
        answerKey: "faq_rescheduleAnswer",
      },
      {
        question: "What happens to my deposit after a booking?",
        questionKey: "faq_depositQuestion",
        answer:
          "Deposits paid at booking are held securely and applied to your move-in costs. They are fully refundable if the property is not delivered as described.",
        answerKey: "faq_depositAnswer",
      },
    ],
  },
  {
    title: "Payments",
    titleKey: "faq_payments",
    icon: "credit-card",
    items: [
      {
        question: "Which payment methods are supported?",
        questionKey: "faq_methodsQuestion",
        answer:
          "We accept EcoCash, OneMoney, InnBucks, Zimswitch, and USD Visa/Mastercard. You can switch your preferred default method in Payments & Wallet.",
        answerKey: "faq_methodsAnswer",
      },
      {
        question: "How do I receive a USSD payment prompt?",
        questionKey: "faq_ussdQuestion",
        answer:
          "When paying by mobile money, your registered phone number receives an EcoCash or OneMoney USSD prompt. Approve it to complete the transaction instantly.",
        answerKey: "faq_ussdAnswer",
      },
      {
        question: "When will my refund be processed?",
        questionKey: "faq_refundQuestion",
        answer:
          "Approved refunds are processed within 3–5 business days and are returned through the original payment method used for the transaction.",
        answerKey: "faq_refundAnswer",
      },
    ],
  },
  {
    title: "Account",
    titleKey: "faq_account",
    icon: "user",
    items: [
      {
        question: "How do I change my password?",
        questionKey: "faq_passwordQuestion",
        answer:
          "Go to Security in your profile, tap 'Change Password' and follow the steps. You will be asked to verify your current password first.",
        answerKey: "faq_passwordAnswer",
      },
      {
        question: "How do I enable Face ID / Touch ID?",
        questionKey: "faq_biometricsQuestion",
        answer:
          "Open Security, then toggle on 'Enable Face ID / Touch ID'. Your device will prompt you to authenticate once to confirm the setup.",
        answerKey: "faq_biometricsAnswer",
      },
      {
        question: "How do I delete my account?",
        questionKey: "faq_deleteQuestion",
        answer:
          "Navigate to Security > Delete Account. You will need to confirm twice, including typing DELETE. Your data is removed within 30 days.",
        answerKey: "faq_deleteAnswer",
      },
    ],
  },
];

const createContactTiles = (
  t: ReturnType<typeof useI18n>["t"]
) => [
  {
    id: "call",
    titleKey: "contact_call" as TranslationKey,
    subtitleKey: "contact_callSub" as TranslationKey,
    icon: "phone" as const,
    color: "#0061FF",
    bg: "bg-primary-100",
    action: () => Linking.openURL("tel:+263242700000"),
  },
  {
    id: "whatsapp",
    titleKey: "contact_whatsapp" as TranslationKey,
    subtitleKey: "contact_whatsappSub" as TranslationKey,
    icon: "message-circle" as const,
    color: "#25D366",
    bg: "bg-emerald-100",
    action: () => Linking.openURL("https://wa.me/263770000000"),
  },
  {
    id: "email",
    titleKey: "contact_email" as TranslationKey,
    subtitleKey: "contact_emailAddr" as TranslationKey,
    icon: "mail" as const,
    color: "#F75555",
    bg: "bg-red-100",
    action: () =>
      Linking.openURL(
        "mailto:support@restate.co.zw?subject=Help Center Enquiry"
      ),
  },
  {
    id: "chat",
    titleKey: "contact_liveChat" as TranslationKey,
    subtitleKey: "contact_liveChatSub" as TranslationKey,
    icon: "message-square" as const,
    color: "#6D28D9",
    bg: "bg-violet-100",
    action: () =>
      Alert.alert(t("contact_liveChatAlert"), t("contact_liveChatBody")),
  },
];

const FaqAccordion = ({ group }: { group: FaqGroup }) => {
  const { t } = useI18n();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenItems((prev) => ({
      ...prev,
      [group.title + index]: !prev[group.title + index],
    }));
  };

  return (
    <View className="mt-5">
      <View className="flex flex-row items-center gap-2">
        <Feather name={group.icon} size={15} color="#0061FF" />
        <Text className="text-xs font-rubik-semibold text-black-200 uppercase tracking-wide">
          {t(group.titleKey)}
        </Text>
      </View>

      <View className="mt-2 rounded-2xl bg-accent-100 border border-primary-100">
        {group.items.map((item, index) => {
          const open = openItems[group.title + index];
          return (
            <View
              key={item.question}
              className={index > 0 ? "border-t border-primary-100" : ""}
            >
              <Pressable
                onPress={() => toggleItem(index)}
                className="flex flex-row items-center justify-between px-4 py-4"
              >
                <Text className="flex-1 text-sm font-rubik-semibold text-black-300 pr-3">
                  {t(item.questionKey)}
                </Text>
                <Feather
                  name={open ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#8C8E98"
                />
              </Pressable>
              {open && (
                <View className="px-4 pb-4">
                  <Text className="text-xs font-rubik text-black-100 leading-5">
                    {t(item.answerKey)}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const HelpCenter = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");
  const [query, setQuery] = useState("");

  const tiles = createContactTiles(t);

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-1 px-5">
        <ScreenHeader title={t("help_title")} subtitle={t("help_subtitle")} />

        <View className="flex flex-row items-center bg-accent-100 border border-primary-100 rounded-2xl px-4 mt-5">
          <Feather name="search" size={18} color="#8C8E98" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t("help_search")}
            placeholderTextColor="#8C8E98"
            className="flex-1 px-3 py-3 font-rubik text-sm text-black-300"
            autoCorrect={false}
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Feather name="x" size={16} color="#8C8E98" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View className="flex flex-row bg-accent-100 rounded-2xl p-1 mt-4 border border-primary-100">
          {(
            [
              { key: "faq", label: t("help_faq") },
              { key: "contact", label: t("help_contact") },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-1 items-center py-2.5 rounded-xl ${
                  active ? "bg-primary-300" : ""
                }`}
              >
                <Text
                  className={`text-xs font-rubik-medium ${
                    active ? "text-white" : "text-black-200"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === "faq" ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-24"
          >
            {query.trim() ? (
              <Text className="text-xs font-rubik text-black-100 mt-4">
                {t("help_showing", { query })}
              </Text>
            ) : null}
            {faqGroups.map((group) => (
              <FaqAccordion key={group.title} group={group} />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-24"
          >
            <Text className="text-sm font-rubik text-black-100 mt-4 leading-5">
              {t("help_team")}
            </Text>

            <View className="mt-3 flex flex-row flex-wrap justify-between">
              {tiles.map((tile) => (
                <TouchableOpacity
                  key={tile.id}
                  onPress={tile.action}
                  className="w-[48%] bg-white rounded-2xl border border-primary-100 p-4 mt-3 flex flex-col"
                >
                  <View
                    className={`size-11 rounded-xl items-center justify-center ${tile.bg}`}
                  >
                    <Feather name={tile.icon} size={20} color={tile.color} />
                  </View>
                  <Text className="text-sm font-rubik-semibold text-black-300 mt-3">
                    {t(tile.titleKey)}
                  </Text>
                  <Text className="text-xs font-rubik text-black-100 mt-1 leading-4">
                    {t(tile.subtitleKey)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mt-6 rounded-2xl border border-primary-100 bg-accent-100 p-4">
              <Text className="text-sm font-rubik-semibold text-black-300">
                {t("help_office")}
              </Text>
              <Text className="text-xs font-rubik text-black-100 mt-1 leading-5">
                {t("help_address")}
              </Text>
              <Text className="text-xs font-rubik text-black-100 mt-1">
                {t("help_hours")}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HelpCenter;