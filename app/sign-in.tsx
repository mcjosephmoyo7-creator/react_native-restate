import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { isAppwriteConfigured, login } from "@/lib/appwrite";
import { useResponsiveLayout } from "@/lib/use-responsive";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";

const Auth = () => {
  const { refetch, loading, isLogged } = useGlobalContext();
  const { width, height, isCompact, isShort } = useResponsiveLayout();
  const [signingIn, setSigningIn] = useState(false);

  const heroHeight = Math.min(height * (isShort ? 0.3 : 0.36), 320);
  const horizontalPadding = width < 380 ? "px-6" : "px-8";

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    if (!isAppwriteConfigured) {
      Alert.alert(
        "Configuration required",
        "Add EXPO_PUBLIC_APPWRITE_ENDPOINT and EXPO_PUBLIC_APPWRITE_PROJECT_ID to .env.local, then restart Expo."
      );
      return;
    }

    setSigningIn(true);
    try {
      const result = await login();
      if (result) {
        await refetch();
        router.replace("/");
      } else {
        Alert.alert(
          "Error",
          "Login was cancelled or failed. Please try again."
        );
      }
    } catch {
      Alert.alert("Error", "Failed to login");
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={{
          minHeight: height,
          paddingBottom: isShort ? 16 : 24,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="w-full self-center"
          style={{ maxWidth: 640, flexGrow: 1 }}
        >
          <Image
            source={images.onboarding}
            className="w-full"
            style={{ height: heroHeight }}
            resizeMode="contain"
          />

          <View className={`${horizontalPadding} ${isCompact ? "mt-5" : "mt-10"}`}>
            <Text className="text-sm text-center uppercase font-rubik text-black-200">
              Welcome to Restate
            </Text>

            <Text
              className={`font-rubik-bold text-black-300 text-center mt-2 ${
                isCompact ? "text-2xl leading-8" : "text-3xl leading-10"
              }`}
            >
              Let&apos;s Get You Closer To {"\n"}
              <Text className="text-primary-300">Your Ideal Home</Text>
            </Text>

            <Text
              className={`font-rubik text-black-200 text-center ${
                isCompact ? "text-base mt-6" : "text-lg mt-10"
              }`}
            >
              Login to ReState with Google
            </Text>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={signingIn}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              className={`bg-white shadow-md shadow-zinc-300 rounded-full w-full ${
                isCompact ? "py-3.5 mt-4" : "py-4 mt-5"
              }`}
            >
              <View className="flex flex-row items-center justify-center">
                {signingIn ? (
                  <ActivityIndicator className="ml-2" color="#0061FF" />
                ) : (
                  <Image
                    source={icons.google}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                )}
                <Text className="text-base font-rubik-medium text-black-300 ml-2">
                  {signingIn ? "Signing in..." : "Continue with Google"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
