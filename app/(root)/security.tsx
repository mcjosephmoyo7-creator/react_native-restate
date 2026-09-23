import { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import ScreenHeader from "@/components/ScreenHeader";
import { useI18n } from "@/lib/i18n";

const Security = () => {
  const { t } = useI18n();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showPasswordSheet, setShowPasswordSheet] = useState(false);
  const [showDeleteStepOne, setShowDeleteStepOne] = useState(false);
  const [showDeleteStepTwo, setShowDeleteStepTwo] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const handleBiometricToggle = async (value: boolean) => {
    if (Platform.OS === "web") {
      Alert.alert(
        t("security_alertNotAvailable"),
        t("security_alertNotAvailableBody")
      );
      return;
    }

    if (value) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled =
        await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !enrolled) {
        Alert.alert(
          t("security_alertNotSetUp"),
          t("security_alertNotSetUpBody")
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t("security_biometrics"),
        fallbackLabel: t("common_cancel"),
      });

      if (result.success) {
        setBiometricsEnabled(true);
        Alert.alert(t("security_alertEnabled"), t("security_alertEnabledBody"));
      }
    } else {
      setBiometricsEnabled(false);
      Alert.alert(t("security_alertDisabled"), t("security_alertDisabledBody"));
    }
  };

  const handleChangePassword = () => {
    if (!password || !newPassword || !confirmPassword) {
      Alert.alert(t("security_alertIncomplete"), t("security_alertIncompleteBody"));
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert(t("security_alertWeak"), t("security_alertWeakBody"));
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(t("security_alertMismatch"), t("security_alertMismatchBody"));
      return;
    }
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordSheet(false);
    Alert.alert(t("common_success"), t("security_alertUpdated"));
  };

  const handleDeleteFinal = () => {
    if (confirmText.trim().toUpperCase() !== "DELETE") {
      Alert.alert(t("security_alertIncorrect"), t("security_alertIncorrectBody"));
      return;
    }
    setShowDeleteStepTwo(false);
    Alert.alert(t("security_alertRequest"), t("security_alertRequestBody"));
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-24 px-5"
      >
        <ScreenHeader
          title={t("security_title")}
          subtitle={t("security_subtitle")}
        />

        <View className="mt-6">
          <Text className="text-xs font-rubik-semibold text-black-200 uppercase tracking-wide mb-2">
            {t("security_signIn")}
          </Text>
          <View className="bg-accent-100 rounded-2xl border border-primary-100">
            <TouchableOpacity
              onPress={() => setShowPasswordSheet(true)}
              className="flex flex-row items-center justify-between px-4 py-4"
            >
              <View className="flex flex-row items-center gap-3">
                <View className="size-10 bg-primary-100 rounded-xl items-center justify-center">
                  <Feather name="lock" size={18} color="#0061FF" />
                </View>
                <View>
                  <Text className="text-sm font-rubik-semibold text-black-300">
                    {t("security_changePassword")}
                  </Text>
                  <Text className="text-[11px] font-rubik text-black-100">
                    {t("security_lastChanged")}
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#8C8E98" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-xs font-rubik-semibold text-black-200 uppercase tracking-wide mb-2">
            {t("security_auth")}
          </Text>
          <View className="bg-accent-100 rounded-2xl border border-primary-100">
            <View className="flex flex-row items-center justify-between px-4 py-4">
              <View className="flex flex-row items-center gap-3 flex-1">
                <View className="size-10 bg-primary-100 rounded-xl items-center justify-center">
                  <MaterialCommunityIcons
                    name="fingerprint"
                    size={20}
                    color="#0061FF"
                  />
                </View>
                <View className="flex-1 mr-3">
                  <Text className="text-sm font-rubik-semibold text-black-300">
                    {t("security_biometrics")}
                  </Text>
                  <Text className="text-xs font-rubik text-black-100 leading-4">
                    {t("security_biometricsDesc")}
                  </Text>
                </View>
              </View>
              <Switch
                value={biometricsEnabled}
                onValueChange={handleBiometricToggle}
                trackColor={{ false: "#E4E4E7", true: "#0061FF" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E4E4E7"
              />
            </View>

            <View className="flex flex-row items-center justify-between px-4 py-4 border-t border-primary-100">
              <View className="flex flex-row items-center gap-3 flex-1">
                <View className="size-10 bg-primary-100 rounded-xl items-center justify-center">
                  <Feather name="shield" size={18} color="#0061FF" />
                </View>
                <View className="flex-1 mr-3">
                  <Text className="text-sm font-rubik-semibold text-black-300">
                    {t("security_twoFA")}
                  </Text>
                  <Text className="text-xs font-rubik text-black-100 leading-4">
                    {t("security_twoFADesc")}
                  </Text>
                </View>
              </View>
              <Switch
                value={twoFAEnabled}
                onValueChange={setTwoFAEnabled}
                trackColor={{ false: "#E4E4E7", true: "#0061FF" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E4E4E7"
              />
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-xs font-rubik-semibold text-black-200 uppercase tracking-wide mb-2">
            {t("security_account")}
          </Text>
          <TouchableOpacity
            onPress={() => setShowDeleteStepOne(true)}
            className="bg-danger/10 rounded-2xl border border-danger/20 px-4 py-4 flex flex-row items-center justify-center"
          >
            <Feather name="trash-2" size={18} color="#F75555" />
            <Text className="text-sm font-rubik-bold text-danger ml-2">
              {t("security_deleteAccount")}
            </Text>
          </TouchableOpacity>
          <Text className="text-[11px] font-rubik text-black-100 text-center mt-2 px-4">
            {t("security_deleteDesc")}
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={showPasswordSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPasswordSheet(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 pb-10">
            <View className="w-10 h-1.5 bg-black-100/30 rounded-full self-center mb-4" />
            <Text className="text-xl font-rubik-bold text-black-300">
              {t("security_changeTitle")}
            </Text>
            <Text className="text-xs font-rubik text-black-100 mt-1">
              {t("security_changeSub")}
            </Text>

            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder={t("security_currentPassword")}
              placeholderTextColor="#8C8E98"
              className="bg-accent-100 border border-primary-100 rounded-xl px-4 py-3 mt-4 font-rubik text-sm text-black-300"
            />
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder={t("security_newPassword")}
              placeholderTextColor="#8C8E98"
              className="bg-accent-100 border border-primary-100 rounded-xl px-4 py-3 mt-3 font-rubik text-sm text-black-300"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder={t("security_confirmPassword")}
              placeholderTextColor="#8C8E98"
              className="bg-accent-100 border border-primary-100 rounded-xl px-4 py-3 mt-3 font-rubik text-sm text-black-300"
            />

            <TouchableOpacity
              onPress={handleChangePassword}
              className="bg-primary-300 rounded-xl py-3.5 items-center mt-5"
            >
              <Text className="text-sm font-rubik-bold text-white">
                {t("security_updatePassword")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowPasswordSheet(false)}
              className="py-3.5 items-center mt-2"
            >
              <Text className="text-sm font-rubik-medium text-black-200">
                {t("common_cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showDeleteStepOne}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteStepOne(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="w-full bg-white rounded-3xl p-6">
            <View className="size-14 bg-danger/10 rounded-full items-center justify-center self-center">
              <Feather name="alert-triangle" size={26} color="#F75555" />
            </View>
            <Text className="text-xl font-rubik-bold text-black-300 text-center mt-4">
              {t("security_deleteTitle")}
            </Text>
            <Text className="text-sm font-rubik text-black-100 text-center mt-2 leading-5">
              {t("security_deleteBody")}
            </Text>
            <View className="flex flex-row gap-3 mt-6">
              <TouchableOpacity
                onPress={() => setShowDeleteStepOne(false)}
                className="flex-1 bg-accent-100 rounded-xl py-3.5 items-center border border-primary-100"
              >
                <Text className="text-sm font-rubik-medium text-black-300">
                  {t("security_goBack")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowDeleteStepOne(false);
                  setShowDeleteStepTwo(true);
                }}
                className="flex-1 bg-danger rounded-xl py-3.5 items-center"
              >
                <Text className="text-sm font-rubik-bold text-white">
                  {t("security_continue")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showDeleteStepTwo}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteStepTwo(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="w-full bg-white rounded-3xl p-6">
            <Text className="text-xl font-rubik-bold text-black-300 text-center">
              {t("security_finalTitle")}
            </Text>
            <Text className="text-sm font-rubik text-black-100 text-center mt-2 leading-5">
              {t("security_finalBody")}
            </Text>
            <TextInput
              value={confirmText}
              onChangeText={setConfirmText}
              autoCapitalize="characters"
              placeholder="DELETE"
              placeholderTextColor="#8C8E98"
              className="bg-accent-100 rounded-xl px-4 py-3 mt-4 font-rubik-bold text-sm text-black-300"
              style={{ borderColor: "#F75555", borderWidth: 1 }}
            />
            <TouchableOpacity
              onPress={handleDeleteFinal}
              className="bg-danger rounded-xl py-3.5 items-center mt-4"
            >
              <Text className="text-sm font-rubik-bold text-white">
                {t("security_permanentlyDelete")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDeleteStepTwo(false)}
              className="py-3.5 items-center mt-2"
            >
              <Text className="text-sm font-rubik-medium text-black-200">
                {t("common_cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Security;