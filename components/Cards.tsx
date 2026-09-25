import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Property } from "@/lib/data";
import FavoriteButton from "@/components/FavoriteButton";
import { useResponsiveLayout } from "@/lib/use-responsive";

interface Props {
  item: Property;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  const { width, height } = useResponsiveLayout();
  const isSmall = width < 360 || height < 650;
  const cardWidth = Math.min(isSmall ? 224 : 240, width - 40);
  const cardHeight = isSmall ? 272 : 320;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: cardWidth, height: cardHeight }}
      className="flex flex-col items-start relative"
    >
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />

      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {item.rating}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-base font-rubik text-white" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${item.price}
          </Text>
          <FavoriteButton
            id={item.$id}
            color="#FFFFFF"
            activeColor="#F75555"
            size={22}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  const { width, height, isNarrow } = useResponsiveLayout();
  const isSmall = width < 390 || height < 650;

  return (
    <TouchableOpacity
      className={`flex-1 w-full mt-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative ${
        isSmall ? "p-2" : "px-3 py-4"
      }`}
      onPress={onPress}
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {item.rating}
        </Text>
      </View>

      <Image
        source={{ uri: item.image }}
        className={`w-full rounded-lg ${
          isSmall ? (isNarrow ? "h-40" : "h-28") : "h-40"
        }`}
      />

      <View className="flex flex-col mt-2">
        <Text
          className={`font-rubik-bold text-black-300 ${
            isSmall ? "text-sm" : "text-base"
          }`}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text className="text-xs font-rubik text-black-100" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text
            className={`font-rubik-bold text-primary-300 ${
              isSmall ? "text-sm" : "text-base"
            }`}
          >
            ${item.price}
          </Text>
          <FavoriteButton
            id={item.$id}
            color="#191D31"
            activeColor="#F75555"
            size={20}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
