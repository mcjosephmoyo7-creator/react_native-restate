import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useFavorites } from "@/lib/favorites-provider";

interface FavoriteButtonProps {
  id: string;
  size?: number;
  color?: string;
  activeColor?: string;
  className?: string;
}

const FavoriteButton = ({
  id,
  size = 24,
  color = "#191D31",
  activeColor = "#F75555",
  className = "",
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    toggleFavorite(id);
    router.push({ pathname: "/bookings", params: { tab: "upcoming" } });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={
        active ? "Remove property from favorites" : "Like property"
      }
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      className={className}
    >
      <Ionicons
        name={active ? "heart" : "heart-outline"}
        size={size}
        color={active ? activeColor : color}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;