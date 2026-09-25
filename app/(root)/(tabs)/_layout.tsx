import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import icons from "@/constants/icons";
import { useI18n } from "@/lib/i18n";
import { useResponsiveLayout } from "@/lib/use-responsive";

const TabIcon = ({
  focused,
  icon,
  title,
  compact,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
  compact: boolean;
}) => (
  <View
    className={`flex-1 flex flex-col items-center ${compact ? "mt-1" : "mt-3"}`}
  >
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className={compact ? "size-5" : "size-6"}
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center ${compact ? "mt-0.5" : "mt-1"}`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const { t } = useI18n();
  const { isShort } = useResponsiveLayout();
  const compact = isShort;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: compact ? 62 : 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tab_home"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title={t("tab_home")}
              compact={compact}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t("tab_explore"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.search}
              title={t("tab_explore")}
              compact={compact}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("tab_profile"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              title={t("tab_profile")}
              compact={compact}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
