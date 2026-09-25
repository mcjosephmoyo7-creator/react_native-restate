import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";

import Search from "@/components/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { Card, FeaturedCard } from "@/components/Cards";

import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useI18n } from "@/lib/i18n";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useResponsiveLayout } from "@/lib/use-responsive";

const Home = () => {
  const { user } = useGlobalContext();
  const { t } = useI18n();
  const { isNarrow, isCompact } = useResponsiveLayout();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.push("/profile")}
                activeOpacity={0.8}
                className="flex flex-row flex-1 mr-3 min-w-0"
              >
                <Image
                  source={{ uri: user?.avatar }}
                  className={`rounded-full ${isCompact ? "size-10" : "size-12"}`}
                />

                <View className="flex flex-col items-start ml-2 justify-center flex-1 min-w-0">
                  <Text className="text-xs font-rubik text-black-100">
                    {t("home_greeting")}
                  </Text>
                  <Text
                    className="text-base font-rubik-medium text-black-300"
                    numberOfLines={1}
                  >
                    {user?.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/notifications")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel="Open notifications"
                className="-m-2 p-2"
              >
                <Image source={icons.bell} className="size-6" />
              </TouchableOpacity>
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  {t("home_featured")}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/explore")}
                  accessibilityRole="button"
                >
                  <Text className="text-base font-rubik-bold text-primary-300">
                    {t("home_seeAll")}
                  </Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            {/* <Button title="seed" onPress={seed} /> */}

            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  {t("home_recommendation")}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/explore")}
                  accessibilityRole="button"
                >
                  <Text className="text-base font-rubik-bold text-primary-300">
                    {t("home_seeAll")}
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
