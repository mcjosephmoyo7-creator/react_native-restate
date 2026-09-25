import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import FavoriteButton from "@/components/FavoriteButton";
import { facilities } from "@/constants/data";

import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";
import { useResponsiveLayout } from "@/lib/use-responsive";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { height, isCompact } = useResponsiveLayout();
  const insets = useSafeAreaInsets();
  const heroHeight = Math.min(Math.max(height * 0.48, 220), 420);
  const contentPadding = isCompact ? "px-4" : "px-5";

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: heroHeight }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          <View
            className="z-50 absolute"
            style={{
              top: insets.top + 10,
              left: isCompact ? 16 : 24,
              right: isCompact ? 16 : 24,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <FavoriteButton id={id!} color="#191D31" size={26} />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        <View className={`${contentPadding} mt-7 flex gap-2`}>
          <Text
            className={`font-rubik-extrabold ${
              isCompact ? "text-xl" : "text-2xl"
            }`}
            numberOfLines={2}
          >
            {property?.name}
          </Text>

          <View className="flex flex-row items-center gap-3 flex-wrap">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {property?.type}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2 flex-1 min-w-0">
              <Image source={icons.star} className="size-5" />
              <Text
                className="text-black-200 text-sm font-rubik-medium flex-1"
                numberOfLines={1}
              >
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          {property ? (
            <View className="flex flex-row items-start mt-5">
              {[
                { icon: icons.bed, value: `${property.bedrooms} Beds` },
                { icon: icons.bath, value: `${property.bathrooms} Baths` },
                { icon: icons.area, value: `${property.area} sqft` },
              ].map((detail) => (
                <View
                  key={detail.value}
                  className="flex-1 min-w-0 flex flex-col items-center"
                >
                  <View
                    className={`flex flex-row items-center justify-center bg-primary-100 rounded-full ${
                      isCompact ? "size-9" : "size-10"
                    }`}
                  >
                    <Image source={detail.icon} className="size-4" />
                  </View>
                  <Text
                    className="text-black-300 text-xs font-rubik-medium mt-1 text-center"
                    numberOfLines={1}
                  >
                    {detail.value}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          <View className="w-full border-t border-primary-200 pt-7 mt-5">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Agent
            </Text>

            <View className="flex flex-row items-center justify-between mt-4">
              <View className="flex flex-row items-center flex-1 min-w-0 mr-3">
                <Image
                  source={{ uri: property?.agent.avatar }}
                  className="size-14 rounded-full"
                />

                <View className="flex flex-col items-start justify-center ml-3 flex-1 min-w-0">
                  <Text
                    className="text-base text-black-300 font-rubik-bold"
                    numberOfLines={1}
                  >
                    {property?.agent.name}
                  </Text>
                  <Text
                    className="text-xs text-black-200 font-rubik-medium"
                    numberOfLines={1}
                  >
                    {property?.agent.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center gap-3">
                <Image source={icons.chat} className="size-7" />
                <Image source={icons.phone} className="size-7" />
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Overview
            </Text>
            <Text className="text-black-200 text-base font-rubik mt-2">
              {property?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Facilities
            </Text>

            {property?.facilities && property.facilities.length > 0 && (
              <View className="flex flex-row flex-wrap items-start mt-2">
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );

                  return (
                    <View
                      key={index}
                      className="w-1/5 flex flex-col items-center min-w-0"
                    >
                      <View
                        className={`bg-primary-100 rounded-full flex items-center justify-center ${
                          isCompact ? "size-12" : "size-14"
                        }`}
                      >
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-black-300 text-sm text-center font-rubik mt-1.5"
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery && property.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 text-xl font-rubik-bold">
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className={`rounded-xl ${isCompact ? "size-36" : "size-40"}`}
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Location
            </Text>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="w-7 h-7" />
              <Text
                className="text-black-200 text-sm font-rubik-medium flex-1"
                numberOfLines={2}
              >
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>

          {property?.reviews && property.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 text-base font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View
        className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200"
        style={{
          paddingTop: isCompact ? 14 : 28,
          paddingBottom: Math.max(insets.bottom, isCompact ? 12 : 28),
          paddingHorizontal: isCompact ? 20 : 28,
        }}
      >
        <View
          className={`flex flex-row items-center justify-between ${
            isCompact ? "gap-4" : "gap-10"
          }`}
        >
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
            <Text
              className={`text-white text-center font-rubik-bold ${
                isCompact ? "text-base" : "text-lg"
              }`}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
