import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import ScreenHeader from "@/components/ScreenHeader";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import { useI18n } from "@/lib/i18n";

const REMOVED_BOOKINGS_KEY = "restate.removedBookings";

const parseRemovedBookingIds = (value: string | null) => {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
};

type BookingStatus = "upcoming" | "completed";

interface Booking {
  id: string;
  property: string;
  location: string;
  image: any;
  date: string;
  time: string;
  type: "viewing" | "booking";
  status: BookingStatus;
  fee: number;
  currency: string;
  coordinates: [number, number];
}

const mockBookings: Booking[] = [
  {
    id: "b1",
    property: "Sunset Ridge Villa",
    location: "Borrowdale, Harare",
    image: images.newYork,
    date: "Sat, 26 Sep 2026",
    time: "10:30 AM",
    type: "viewing",
    status: "upcoming",
    fee: 25,
    currency: "USD",
    coordinates: [-17.796, 31.085],
  },
  {
    id: "b2",
    property: "Avondale Heights Apartment",
    location: "Avondale, Harare",
    image: images.japan,
    date: "Mon, 28 Sep 2026",
    time: "3:00 PM",
    type: "booking",
    status: "upcoming",
    fee: 500,
    currency: "USD",
    coordinates: [-17.791, 31.062],
  },
  {
    id: "b3",
    property: "Mount Pleasant Townhouse",
    location: "Mount Pleasant, Harare",
    image: images.newYork,
    date: "Fri, 18 Sep 2026",
    time: "11:00 AM",
    type: "viewing",
    status: "completed",
    fee: 25,
    currency: "USD",
    coordinates: [-17.78, 31.04],
  },
  {
    id: "b4",
    property: "Greendale Family House",
    location: "Greendale, Harare",
    image: images.japan,
    date: "Tue, 08 Sep 2026",
    time: "2:00 PM",
    type: "booking",
    status: "completed",
    fee: 1200,
    currency: "USD",
    coordinates: [-17.833, 31.105],
  },
];

const statusStyle: Record<BookingStatus, { className: string }> = {
  upcoming: { className: "bg-primary-300" },
  completed: { className: "bg-emerald-500" },
};

const BookingCard = ({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (booking: Booking) => void;
}) => {
  const { t } = useI18n();
  const badge = statusStyle[booking.status];
  const statusLabel =
    booking.status === "upcoming"
      ? t("bookings_upcoming")
      : t("bookings_completed");

  const openDirections = () => {
    const [lat, lng] = booking.coordinates;
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    ).catch(() => {});
  };

  return (
    <View className="bg-white rounded-2xl shadow-lg shadow-black-100/70 border border-primary-100 overflow-hidden mt-4">
      <View className="flex flex-row">
        <Image source={booking.image} className="w-24 h-full" />
        <View className="flex flex-1 flex-col p-3">
          <View className="flex flex-row items-start justify-between">
            <Text
              className="text-base font-rubik-bold text-black-300 flex-1"
              numberOfLines={1}
            >
              {booking.property}
            </Text>
            <View className={`px-2 py-1 rounded-full ml-2 ${badge.className}`}>
              <Text className="text-[10px] font-rubik-bold text-white">
                {statusLabel}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center mt-1">
            <Feather name="map-pin" size={12} color="#666876" />
            <Text
              className="text-xs font-rubik text-black-100 ml-1"
              numberOfLines={1}
            >
              {booking.location}
            </Text>
          </View>

          <View className="flex flex-row items-center mt-1">
            <Feather name="calendar" size={12} color="#666876" />
            <Text className="text-xs font-rubik text-black-100 ml-1">
              {booking.date} · {booking.time}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="text-sm font-rubik-bold text-primary-300">
              {booking.currency} {booking.fee.toLocaleString()}{" "}
              <Text className="text-[10px] font-rubik text-black-100">
                / {booking.type === "viewing" ? t("bookings_viewingFee") : t("bookings_deposit")}
              </Text>
            </Text>
          </View>

          {booking.status === "upcoming" && (
            <View className="flex flex-row items-center mt-2 gap-2">
              <TouchableOpacity
                onPress={() => onCancel(booking)}
                className="flex-1 flex-row items-center justify-center bg-danger/10 rounded-lg py-2"
              >
                <Text className="text-xs font-rubik-medium text-danger">
                  {t("bookings_cancelBooking")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={openDirections}
                className="flex-1 flex-row items-center justify-center bg-primary-300 rounded-lg py-2"
              >
                <Ionicons name="navigate" size={14} color="#FFFFFF" />
                <Text className="text-xs font-rubik-medium text-white ml-1">
                  {t("bookings_directions")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const Bookings = () => {
  const { user } = useGlobalContext();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const removedBookingIdsRef = useRef<Set<string>>(new Set());
  const storageKey = `${REMOVED_BOOKINGS_KEY}:${user?.$id ?? "guest"}`;

  useEffect(() => {
    let isCurrent = true;
    removedBookingIdsRef.current = new Set();

    void AsyncStorage.getItem(storageKey)
      .then((storedValue) => {
        if (!isCurrent) return;

        const removedIds = new Set(parseRemovedBookingIds(storedValue));
        removedIds.forEach((id) => removedBookingIdsRef.current.add(id));
        setBookings((currentBookings) =>
          currentBookings.filter((booking) => !removedIds.has(booking.id))
        );
      })
      .catch(() => {});

    return () => {
      isCurrent = false;
    };
  }, [storageKey]);

  const tabs: { key: BookingStatus; label: string }[] = [
    { key: "upcoming", label: t("bookings_upcoming") },
    { key: "completed", label: t("bookings_completed") },
  ];

  const confirmCancellation = () => {
    if (!cancelTarget) return;

    const removedIds = new Set(removedBookingIdsRef.current);
    removedIds.add(cancelTarget.id);
    removedBookingIdsRef.current = removedIds;

    setBookings((prev) =>
      prev.filter((booking) => booking.id !== cancelTarget.id)
    );
    void AsyncStorage.setItem(storageKey, JSON.stringify([...removedIds])).catch(
      () => {}
    );
    setCancelTarget(null);
    setActiveTab("upcoming");
    Alert.alert(
      t("bookings_cancelledAlert"),
      t("bookings_cancelledBody", { property: cancelTarget.property })
    );
  };

  const visible = bookings.filter((b) => b.status === activeTab);

  const emptyLabel =
    activeTab === "upcoming"
      ? t("bookings_noUpcoming")
      : t("bookings_noCompleted");

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-24 px-5"
      >
        <ScreenHeader title={t("bookings_title")} />

        <View className="flex flex-row bg-accent-100 rounded-2xl p-1 mt-5 border border-primary-100">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl ${
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
                <View
                  className={`ml-2 px-1.5 rounded-full ${
                    active ? "bg-white/25" : "bg-primary-100"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-rubik-bold ${
                      active ? "text-white" : "text-primary-300"
                    }`}
                  >
                    {
                      bookings.filter((b) => b.status === tab.key).length
                    }
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {visible.length === 0 ? (
          <View className="flex flex-col items-center justify-center mt-24">
            <Ionicons name="calendar-outline" size={48} color="#8C8E98" />
            <Text className="text-base font-rubik-medium text-black-200 mt-3">
              {emptyLabel}
            </Text>
          </View>
        ) : (
          visible.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={setCancelTarget}
            />
          ))
        )}
      </ScrollView>

      <Modal
        visible={!!cancelTarget}
        transparent
        animationType="fade"
        onRequestClose={() => setCancelTarget(null)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="w-full bg-white rounded-3xl p-6">
            <View className="size-14 bg-danger/10 rounded-full items-center justify-center self-center">
              <Feather name="alert-triangle" size={28} color="#F75555" />
            </View>

            <Text className="text-xl font-rubik-bold text-black-300 text-center mt-4">
              {t("bookings_cancelTitle")}
            </Text>
            <Text className="text-sm font-rubik text-black-100 text-center mt-2 leading-5">
              {t("bookings_cancelMessage", {
                property: cancelTarget?.property ?? "",
                date: cancelTarget?.date ?? "",
              })}
            </Text>

            <View className="flex flex-row gap-3 mt-6">
              <TouchableOpacity
                onPress={() => setCancelTarget(null)}
                className="flex-1 bg-accent-100 rounded-xl py-3.5 items-center border border-primary-100"
              >
                <Text className="text-sm font-rubik-medium text-black-300">
                  {t("bookings_keepBooking")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmCancellation}
                className="flex-1 bg-danger rounded-xl py-3.5 items-center"
              >
                <Text className="text-sm font-rubik-bold text-white">
                  {t("bookings_yesCancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Bookings;