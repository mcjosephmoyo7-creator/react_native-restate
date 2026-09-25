import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import ScreenHeader from "@/components/ScreenHeader";
import images from "@/constants/images";
import { useResponsiveLayout } from "@/lib/use-responsive";

const referralCode = "RESTATE-ZW";

interface Invitee {
  id: string;
  name: string;
  phone: string;
  initial: string;
  color: string;
  status: "Pending" | "Rewarded";
  date: string;
  dateLabel: string;
}

const invitees: Invitee[] = [
  {
    id: "i1",
    name: "Tendai Moyo",
    phone: "+263 77 123 4567",
    initial: "TM",
    color: "bg-emerald-100",
    status: "Rewarded",
    date: "18 Sep 2026",
    dateLabel: "Joined · 18 Sep 2026",
  },
  {
    id: "i2",
    name: "Chiedza Ndlovu",
    phone: "+263 71 234 5678",
    initial: "CN",
    color: "bg-violet-100",
    status: "Pending",
    date: "21 Sep 2026",
    dateLabel: "Invited · 21 Sep 2026",
  },
  {
    id: "i3",
    name: "Farai Sibanda",
    phone: "+263 78 345 6789",
    initial: "FS",
    color: "bg-sky-100",
    status: "Pending",
    date: "21 Sep 2026",
    dateLabel: "Invited · 21 Sep 2026",
  },
  {
    id: "i4",
    name: "Rudo Gumbo",
    phone: "+263 73 456 7890",
    initial: "RG",
    color: "bg-amber-100",
    status: "Rewarded",
    date: "10 Sep 2026",
    dateLabel: "Joined · 10 Sep 2026",
  },
];

const shareMessage =
  "Move with Restate! Use my code RESTATE-ZW on sign-up and we both earn USD 25 in rewards once you complete a booking. Download: https://restate.co.zw/invite/RESTATE-ZW";

const InviteFriends = () => {
  const [copied, setCopied] = useState(false);
  const { isCompact } = useResponsiveLayout();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share(
        {
          message: shareMessage,
          url: "https://restate.co.zw/invite/RESTATE-ZW",
        },
        {
          subject: "Invite from Restate — earn rewards",
          dialogTitle: "Share your referral link",
        }
      );
      if (result.action === Share.sharedAction && result.activityType) {
        Alert.alert("Shared", "Thanks for sharing!");
      }
    } catch {
      Alert.alert("Error", "Unable to open the share sheet.");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-24 px-5"
      >
        <ScreenHeader title="Invite Friends" />

        <View className="mt-5 rounded-3xl overflow-hidden">
          <Image
            source={images.cardGradient}
            className={`w-full ${isCompact ? "h-40" : "h-44"}`}
          />
          <View className="absolute inset-0 p-5 justify-between">
            <View className="size-11 bg-white/20 rounded-2xl items-center justify-center">
              <Feather name="gift" size={22} color="#FFFFFF" />
            </View>
            <View>
              <Text
                className={`font-rubik-extrabold text-white ${
                  isCompact ? "text-xl" : "text-2xl"
                }`}
              >
                Invite Friends & Earn Rewards
              </Text>
              <Text className="text-sm font-rubik text-white/90 mt-1">
                Earn USD 25 for every friend who books their first property.
              </Text>
            </View>
          </View>
          <View className="absolute top-5 right-5 bg-white/25 rounded-full px-3 py-1">
            <Text className="text-[10px] font-rubik-bold text-white">
              ZW · USD & ZiG
            </Text>
          </View>
        </View>

        <Text className="text-lg font-rubik-bold text-black-300 mt-6">
          Your Referral Code
        </Text>
        <Text className="text-xs font-rubik text-black-100 mt-1">
          Share this code or link — you&apos;ll earn rewards on every new sign-up.
        </Text>

        <View className="mt-3 flex flex-row items-center justify-between rounded-2xl border border-primary-200 bg-primary-100 px-4 py-4">
          <View className="flex flex-row items-center gap-2 flex-1 min-w-0 mr-3">
            <Feather name="copy" size={16} color="#0061FF" />
            <Text
              className="text-base font-rubik-extrabold text-primary-300 tracking-wider flex-1"
              numberOfLines={1}
            >
              {referralCode}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleCopy}
            className="bg-primary-300 rounded-xl px-4 py-2.5 shrink-0"
          >
            <Text className="text-xs font-rubik-bold text-white">
              {copied ? "Copied!" : "Copy Code"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleShare}
          className="flex flex-row items-center justify-center bg-primary-300 rounded-2xl py-4 mt-4"
        >
          <MaterialCommunityIcons name="share-variant" size={20} color="#FFFFFF" />
          <Text className="text-sm font-rubik-bold text-white ml-2">
            Share Referral Link
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-between mt-7">
          <Text className="text-lg font-rubik-bold text-black-300">
            Invited Friends
          </Text>
          <Text className="text-xs font-rubik-medium text-primary-300">
            {invitees.filter((i) => i.status === "Rewarded").length} rewarded
          </Text>
        </View>

        <View className="mt-3">
          {invitees.map((invitee, index) => (
            <View
              key={invitee.id}
              className={`flex flex-row items-center bg-white rounded-2xl border border-primary-100 p-3.5 ${
                index > 0 ? "mt-3" : ""
              }`}
            >
              <View
                className={`size-12 rounded-full items-center justify-center ${invitee.color}`}
              >
                <Text className="text-sm font-rubik-bold text-black-300">
                  {invitee.initial}
                </Text>
              </View>

              <View className="flex flex-1 ml-3 mr-2 min-w-0">
                <Text
                  className="text-sm font-rubik-semibold text-black-300"
                  numberOfLines={1}
                >
                  {invitee.name}
                </Text>
                <Text
                  className="text-xs font-rubik text-black-100 mt-0.5"
                  numberOfLines={1}
                >
                  {invitee.phone} · {invitee.date}
                </Text>
              </View>

              <View
                className={`flex flex-row items-center px-2.5 py-1 rounded-full shrink-0 ${
                  invitee.status === "Rewarded"
                    ? "bg-emerald-100"
                    : "bg-amber-100"
                }`}
              >
                <Feather
                  name={invitee.status === "Rewarded" ? "check" : "clock"}
                  size={11}
                  color={invitee.status === "Rewarded" ? "#047857" : "#B45309"}
                />
                <Text
                  className={`text-[10px] font-rubik-bold ml-1 ${
                    invitee.status === "Rewarded"
                      ? "text-emerald-700"
                      : "text-amber-700"
                  }`}
                >
                  {invitee.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-6 rounded-2xl border border-primary-100 bg-accent-100 p-4 flex flex-row items-start gap-2">
          <Feather name="info" size={14} color="#8C8E98" />
          <Text className="flex-1 text-xs font-rubik text-black-100 leading-4">
            Rewards are paid to your wallet once the invited friend completes
            their first successful booking. Terms & conditions apply.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InviteFriends;