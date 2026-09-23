import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type { Review } from "@/lib/data";

interface Props {
  item: Review;
}

const Comment = ({ item }: Props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(120);

  const toggleLike = () => {
    setLiked((prev) => {
      setLikes((current) => (prev ? current - 1 : current + 1));
      return !prev;
    });
  };

  return (
    <View className="flex flex-col items-start">
      <View className="flex flex-row items-center">
        <Image source={{ uri: item.avatar }} className="size-14 rounded-full" />
        <Text className="text-base text-black-300 text-start font-rubik-bold ml-3">
          {item.name}
        </Text>
      </View>

      <Text className="text-black-200 text-base font-rubik mt-2">
        {item.review}
      </Text>

      <View className="flex flex-row items-center w-full justify-between mt-4">
        <TouchableOpacity
          onPress={toggleLike}
          className="flex flex-row items-center"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? "#F75555" : "#0061FF"}
          />
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            {likes}
          </Text>
        </TouchableOpacity>
        <Text className="text-black-100 text-sm font-rubik">
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;