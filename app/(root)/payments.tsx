import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import ScreenHeader from "@/components/ScreenHeader";
import images from "@/constants/images";
import { useI18n, TranslationKey } from "@/lib/i18n";
import { useResponsiveLayout } from "@/lib/use-responsive";

type Currency = "USD" | "ZiG";

type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  descKey: TranslationKey;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconBg: string;
  iconColor: string;
  mobileMoney: boolean;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "ecocash",
    name: "EcoCash",
    description: "Mobile Money · USD / ZiG",
    descKey: "method_mobileMoney",
    icon: "cellphone",
    iconBg: "bg-emerald-100",
    iconColor: "#047857",
    mobileMoney: true,
  },
  {
    id: "onemoney",
    name: "OneMoney",
    description: "Mobile Money · NetOne",
    descKey: "methodOne_mobileMoney",
    icon: "cellphone",
    iconBg: "bg-red-100",
    iconColor: "#DC2626",
    mobileMoney: true,
  },
  {
    id: "innbucks",
    name: "InnBucks",
    description: "Cash Deposit / Wallet",
    descKey: "method_cashDeposit",
    icon: "cash-multiple",
    iconBg: "bg-amber-100",
    iconColor: "#B45309",
    mobileMoney: true,
  },
  {
    id: "zimswitch",
    name: "Zimswitch",
    description: "ZiG Bank Card",
    descKey: "method_zimswitch",
    icon: "bank",
    iconBg: "bg-sky-100",
    iconColor: "#0369A1",
    mobileMoney: false,
  },
  {
    id: "visa",
    name: "USD Card",
    description: "Visa / Mastercard",
    descKey: "method_visa",
    icon: "credit-card",
    iconBg: "bg-violet-100",
    iconColor: "#6D28D9",
    mobileMoney: false,
  },
];

type TxStatus = "Successful" | "Pending USSD Approval" | "Failed";

interface Transaction {
  id: string;
  date: string;
  property: string;
  gateway: string;
  amount: number;
  currency: string;
  status: TxStatus;
  purpose: string;
}

const transactions: Transaction[] = [
  {
    id: "t1",
    date: "21 Sep 2026",
    property: "Sunset Ridge Villa",
    gateway: "EcoCash",
    amount: 25,
    currency: "USD",
    status: "Successful",
    purpose: "Property viewing fee",
  },
  {
    id: "t2",
    date: "18 Sep 2026",
    property: "Avondale Heights Apt",
    gateway: "Visa",
    amount: 500,
    currency: "USD",
    status: "Successful",
    purpose: "Booking deposit",
  },
  {
    id: "t3",
    date: "12 Sep 2026",
    property: "CBD Executive Suite",
    gateway: "OneMoney",
    amount: 3800,
    currency: "ZiG",
    status: "Pending USSD Approval",
    purpose: "Monthly rent",
  },
  {
    id: "t4",
    date: "05 Sep 2026",
    property: "Greendale Family House",
    gateway: "Zimswitch",
    amount: 2500,
    currency: "ZiG",
    status: "Failed",
    purpose: "Booking deposit",
  },
];

const statusStyle: Record<
  TxStatus,
  {
    className: string;
    text: string;
    icon: "check-circle" | "clock-outline" | "close-circle";
    statusKey: TranslationKey;
  }
> = {
  Successful: {
    className: "bg-emerald-100",
    text: "#047857",
    icon: "check-circle",
    statusKey: "tx_success",
  },
  "Pending USSD Approval": {
    className: "bg-amber-100",
    text: "#B45309",
    icon: "clock-outline",
    statusKey: "tx_pending",
  },
  Failed: {
    className: "bg-red-100",
    text: "#DC2626",
    icon: "close-circle",
    statusKey: "tx_failed",
  },
};

const purposeKeys: Record<string, TranslationKey> = {
  "Property viewing fee": "tx_viewingFee",
  "Booking deposit": "tx_deposit",
  "Monthly rent": "tx_rent",
};

const currencySymbol = (code: string) => (code === "USD" ? "$" : "ZiG");

const Payments = () => {
  const { t } = useI18n();
  const { isCompact } = useResponsiveLayout();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedMethod, setSelectedMethod] = useState("ecocash");
  const [phone, setPhone] = useState("+263 77 000 0000");
  const [isPhoneSaved, setIsPhoneSaved] = useState(true);

  const selected = paymentMethods.find((m) => m.id === selectedMethod)!;

  return (
    <SafeAreaView className="h-full bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-24 px-5"
        >
          <ScreenHeader title={t("payments_title")} />

          <View className="flex flex-row bg-accent-100 rounded-2xl p-1.5 mt-5 border border-primary-100">
            {(["USD", "ZiG"] as Currency[]).map((code) => {
              const active = currency === code;
              return (
                <TouchableOpacity
                  key={code}
                  onPress={() => setCurrency(code)}
                  className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl ${
                    active ? "bg-primary-300" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-rubik-bold ${
                      active ? "text-white" : "text-black-200"
                    }`}
                  >
                    {code === "USD" ? "$ USD" : "ZiG"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="mt-5 rounded-3xl overflow-hidden">
            <Image source={images.cardGradient} className="w-full h-36" />
            <View className="absolute inset-0 p-5 justify-between">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xs font-rubik-medium text-white/80">
                  {t("payments_walletBalance")}
                </Text>
                <MaterialCommunityIcons name="wallet" size={22} color="#FFF" />
              </View>
              <View>
                <Text
                  className={`font-rubik-extrabold text-white ${
                    isCompact ? "text-2xl" : "text-3xl"
                  }`}
                  numberOfLines={1}
                >
                  {currency === "USD" ? "$ 245.00" : "ZiG 6,430.00"}
                </Text>
                <Text className="text-xs font-rubik text-white/80 mt-1">
                  {t("payments_availableBalance", { currency })}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-row items-center justify-between mt-6">
            <Text className="text-lg font-rubik-bold text-black-300">
              {t("payments_paymentMethods")}
            </Text>
            <Text className="text-xs font-rubik-medium text-primary-300">
              {selected.name}
            </Text>
          </View>

          <View className="mt-3 gap-3">
            {paymentMethods.map((method) => {
              const active = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => {
                    setSelectedMethod(method.id);
                    setIsPhoneSaved(false);
                  }}
                  className={`flex flex-row items-center justify-between rounded-2xl border p-4 ${
                    active
                      ? "border-primary-300 bg-primary-100"
                      : "border-primary-100 bg-white"
                  }`}
                >
                  <View className="flex flex-row items-center gap-3">
                    <View
                      className={`size-11 rounded-xl items-center justify-center ${method.iconBg}`}
                    >
                      <MaterialCommunityIcons
                        name={method.icon}
                        size={22}
                        color={method.iconColor}
                      />
                    </View>
                    <View className="flex-1 min-w-0 mr-3">
                      <Text
                        className="text-sm font-rubik-semibold text-black-300"
                        numberOfLines={1}
                      >
                        {method.name}
                      </Text>
                      <Text
                        className="text-xs font-rubik text-black-100"
                        numberOfLines={1}
                      >
                        {t(method.descKey)}
                      </Text>
                    </View>
                  </View>

                  <View
                    className={`size-6 items-center justify-center rounded-full border ${
                      active ? "border-primary-300" : "border-black-100"
                    }`}
                  >
                    {active && (
                      <View className="size-3.5 rounded-full bg-primary-300" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {selected.mobileMoney && (
            <View className="mt-4 rounded-2xl border border-primary-100 bg-accent-100 p-4">
              <View className="flex flex-row items-center gap-2">
                <Feather name="smartphone" size={16} color="#0061FF" />
                <Text className="text-sm font-rubik-semibold text-black-300">
                  {selected.name} · {t("payments_phoneLabel")}
                </Text>
              </View>
              <Text className="text-xs font-rubik text-black-100 mt-1">
                {t("payments_phonePrompt", { method: selected.name })}
              </Text>
              <TextInput
                value={phone}
                onChangeText={(t) => {
                  setPhone(t);
                  setIsPhoneSaved(false);
                }}
                keyboardType="phone-pad"
                placeholder="+263 77X XXX XXX"
                placeholderTextColor="#8C8E98"
                className="bg-white border border-primary-100 rounded-xl px-4 py-3 mt-3 font-rubik text-sm text-black-300"
              />
              <TouchableOpacity
                onPress={() => setIsPhoneSaved(true)}
                className="bg-primary-300 rounded-xl py-3 items-center mt-3"
              >
                <Text className="text-sm font-rubik-bold text-white">
                  {isPhoneSaved ? t("payments_numberSaved") : t("payments_saveNumber")}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="flex flex-row items-center justify-between mt-7">
            <Text className="text-lg font-rubik-bold text-black-300">
              {t("payments_transactionHistory")}
            </Text>
            <Text className="text-xs font-rubik-medium text-primary-300">
              {t("payments_viewAll")}
            </Text>
          </View>

          <View className="mt-3 gap-3">
            {transactions.map((tx) => {
              const s = statusStyle[tx.status];
              return (
                <View
                  key={tx.id}
                  className="bg-white rounded-2xl border border-primary-100 p-4"
                >
                  <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-1 flex-col mr-3">
                      <Text
                        className="text-sm font-rubik-semibold text-black-300"
                        numberOfLines={1}
                      >
                        {tx.property}
                      </Text>
                      <Text className="text-xs font-rubik text-black-100 mt-0.5">
                        {tx.date} · {tx.gateway}
                      </Text>
                      <Text className="text-xs font-rubik text-black-100 mt-0.5">
                        {purposeKeys[tx.purpose]
                          ? t(purposeKeys[tx.purpose])
                          : tx.purpose}
                      </Text>
                    </View>
                    <View className="flex flex-col items-end ml-2 shrink">
                      <Text
                        className="text-sm font-rubik-bold text-black-300"
                        numberOfLines={1}
                      >
                        {currencySymbol(tx.currency)} {tx.amount.toLocaleString()}
                      </Text>
                      <View className="flex flex-row items-center mt-1 px-2 py-0.5 rounded-full">
                        <MaterialCommunityIcons
                          name={s.icon}
                          size={12}
                          color={s.text}
                        />
                        <Text
                          className="text-[10px] font-rubik-medium ml-1"
                          style={{ color: s.text }}
                        >
                          {t(s.statusKey)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Payments;