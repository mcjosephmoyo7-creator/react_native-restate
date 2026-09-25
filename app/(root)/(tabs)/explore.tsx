import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";

import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { useI18n } from "@/lib/i18n";
import { useResponsiveLayout } from "@/lib/use-responsive";

const Explore = () => {
  const { t } = useI18n();
  const { isNarrow, isCompact } = useResponsiveLayout();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
    });
  }, [params.filter, params.query, refetch]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        key={isNarrow ? "one-column" : "two-columns"}
        data={properties}
        numColumns={isNarrow ? 1 : 2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pb-32"
        columnWrapperClassName={isNarrow ? "" : "flex gap-3 px-3"}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className={isCompact ? "px-4" : "px-5"}>
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.replace("/")}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                {t("explore_title")}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/notifications")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel="Open notifications"
                className="-m-2 p-2"
              >
                <Image source={icons.bell} className="w-6 h-6" />
              </TouchableOpacity>
            </View>

            <Search />

            <View className="mt-5">
              <Filters />

              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                {t("explore_found", { count: properties?.length ?? 0 })}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Explore;
