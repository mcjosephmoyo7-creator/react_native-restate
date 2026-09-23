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

import { login } from "@/lib/appwrite";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";

const Auth = () => {
  const { refetch, loading, isLogged } = useGlobalContext();
  const [signingIn, setSigningIn] = useState(false);

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    setSigningIn(true);
    try {
      const result = await login();
      if (result) {
        refetch();
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
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To Real Scout
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let&apos;s Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to Real Scout with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={signingIn}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
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
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                {signingIn ? "Signing in..." : "Continue with Google"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
