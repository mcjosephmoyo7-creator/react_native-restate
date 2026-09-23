import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ScreenHeader from "@/components/ScreenHeader";
import { useI18n, supportedLanguages } from "@/lib/i18n";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region?: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", region: "United Kingdom" },
  { code: "en-US", name: "English (US)", nativeName: "English", flag: "🇺🇸", region: "United States" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", region: "Spain & Latin America" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", region: "France, Belgium, Canada" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", region: "Germany, Austria, Switzerland" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", region: "Italy" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", region: "Portugal, Brazil, Angola" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", region: "Netherlands, Belgium" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", region: "Mainland China" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼", region: "Taiwan, Hong Kong" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", region: "Middle East & North Africa" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", region: "India" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", region: "Japan" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", region: "South Korea" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", region: "Russia & CIS" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", region: "East Africa" },
  { code: "sn", name: "Shona", nativeName: "ChiShona", flag: "🇿🇼", region: "Zimbabwe" },
  { code: "nd", name: "Ndebele", nativeName: "IsiNdebele", flag: "🇿🇼", region: "Zimbabwe" },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦", region: "South Africa, Namibia" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", region: "Turkey" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", region: "Indonesia" },
];

const resolveCode = (code: string) => {
  if (supportedLanguages.some((s) => s.code === code)) return code;
  const base = code.split("-")[0];
  return supportedLanguages.some((s) => s.code === base) ? base : "en";
};

const LanguageScreen = () => {
  const { language, setLanguage, t } = useI18n();
  const [query, setQuery] = useState("");
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter((l) =>
      `${l.name} ${l.nativeName} ${l.region}`.toLowerCase().includes(q)
    );
  }, [query]);

  const activeCode = languages.find(
    (l) => l.code === language || l.code.startsWith(`${language}-`)
  )?.code;

  const confirmSwitch = () => {
    if (!pendingLanguage) return;
    setLanguage(resolveCode(pendingLanguage.code));
    setPendingLanguage(null);
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        contentContainerClassName="pb-24 px-5"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <ScreenHeader
              title={t("language_title")}
              subtitle={t("language_subtitle")}
            />

            <View className="flex flex-row items-center bg-accent-100 border border-primary-100 rounded-2xl px-4 mt-5">
              <Feather name="search" size={18} color="#8C8E98" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t("language_search")}
                placeholderTextColor="#8C8E98"
                className="flex-1 px-3 py-3.5 font-rubik text-sm text-black-300"
                autoCorrect={false}
              />
              {query ? (
                <TouchableOpacity onPress={() => setQuery("")}>
                  <Feather name="x" size={16} color="#8C8E98" />
                </TouchableOpacity>
              ) : null}
            </View>

            <View className="flex flex-row items-center justify-between mt-5">
              <Text className="text-lg font-rubik-bold text-black-300">
                {t("language_select")}
              </Text>
              <Text className="text-xs font-rubik-medium text-black-100">
                {t("language_languages", { count: filtered.length })}
              </Text>
            </View>

            <View className="mt-3 rounded-2xl bg-primary-100/60 border border-primary-100 p-3 flex flex-row items-center gap-2">
              <Feather name="globe" size={14} color="#0061FF" />
              <Text className="flex-1 text-xs font-rubik text-black-200">
                {t("language_synced")}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const active = item.code === activeCode;
          return (
            <TouchableOpacity
              onPress={() => setPendingLanguage(item)}
              className={`flex flex-row items-center justify-between rounded-2xl border px-4 py-4 mt-3 ${
                active
                  ? "border-primary-300 bg-primary-100"
                  : "border-primary-100 bg-white"
              }`}
            >
              <View className="flex flex-row items-center gap-3">
                <Text className="text-2xl">{item.flag}</Text>
                <View>
                  <Text className="text-sm font-rubik-semibold text-black-300">
                    {item.name}
                  </Text>
                  <Text className="text-xs font-rubik text-black-100">
                    {item.nativeName} · {item.region}
                  </Text>
                </View>
              </View>
              {active && (
                <View className="size-6 bg-primary-300 rounded-full items-center justify-center">
                  <Feather name="check" size={14} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text className="text-sm font-rubik text-black-200 text-center mt-10">
            {t("language_noMatch", { query })}
          </Text>
        }
      />

      <Modal
        visible={!!pendingLanguage}
        transparent
        animationType="fade"
        onRequestClose={() => setPendingLanguage(null)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="w-full bg-white rounded-3xl p-6">
            <View className="size-14 bg-primary-100 rounded-full items-center justify-center self-center">
              <Feather name="globe" size={26} color="#0061FF" />
            </View>
            <Text className="text-xl font-rubik-bold text-black-300 text-center mt-4">
              {t("language_confirmTitle")}
            </Text>
            <Text className="text-sm font-rubik text-black-100 text-center mt-2 leading-5">
              {t("language_confirmBody", { name: pendingLanguage?.name })}
            </Text>

            <View className="flex flex-row gap-3 mt-6">
              <TouchableOpacity
                onPress={() => setPendingLanguage(null)}
                className="flex-1 bg-accent-100 rounded-xl py-3.5 items-center border border-primary-100"
              >
                <Text className="text-sm font-rubik-medium text-black-300">
                  {t("language_keep")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmSwitch}
                className="flex-1 bg-primary-300 rounded-xl py-3.5 items-center"
              >
                <Text className="text-sm font-rubik-bold text-white">
                  {t("language_switch")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LanguageScreen;