import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import icons from "@/constants/icons";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: React.ReactNode;
}

const ScreenHeader = ({ title, subtitle, rightIcon }: ScreenHeaderProps) => {
  return (
    <View className="flex flex-row items-center justify-between mt-5">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
      >
        <Image source={icons.backArrow} className="size-5" />
      </TouchableOpacity>

      <View className="flex flex-1 items-center px-2">
        <Text
          className="text-base text-center font-rubik-medium text-black-300"
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            className="text-xs font-rubik text-black-100 text-center"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightIcon ?? <View className="size-11" />}
    </View>
  );
};

export default ScreenHeader;