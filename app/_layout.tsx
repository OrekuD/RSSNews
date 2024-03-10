import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../src/utils/unistyles";

import { useColorScheme } from "@/src/hooks/useColorScheme";
import useSettingsStore from "@/src/store/useSettingsStore";
import { UnistylesRuntime } from "react-native-unistyles";
import { Platform, StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const settingsStore = useSettingsStore(({ settings }) => settings);
  const [loaded, error] = useFonts({
    SFProDisplay: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    SFProDisplayMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    SFProDisplaySemibold: require("../assets/fonts/SF-Pro-Display-Semibold.otf"),
    SFProDisplayBold: require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    SFProDisplayHeavy: require("../assets/fonts/SF-Pro-Display-Heavy.otf"),
    SFProDisplayBlack: require("../assets/fonts/SF-Pro-Display-Black.otf"),
    NewYork: require("../assets/fonts/NewYorkSmall-Regular.otf"),
    NewYorkMedium: require("../assets/fonts/NewYorkSmall-Medium.otf"),
    NewYorkSemibold: require("../assets/fonts/NewYorkSmall-Semibold.otf"),
    NewYorkBold: require("../assets/fonts/NewYorkSmall-Bold.otf"),
    NewYorkHeavy: require("../assets/fonts/NewYorkSmall-Heavy.otf"),
    NewYorkBlack: require("../assets/fonts/NewYorkSmall-Black.otf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    UnistylesRuntime.setAdaptiveThemes(settingsStore.themeMode === "system");
    if (settingsStore.themeMode !== "system") {
      UnistylesRuntime.setTheme(settingsStore.themeMode);
      StatusBar.setBarStyle(
        settingsStore.themeMode === "dark" ? "light-content" : "dark-content"
      );
    } else {
      StatusBar.setBarStyle(
        colorScheme === "dark" ? "light-content" : "dark-content"
      );
    }
  }, [settingsStore.themeMode, colorScheme]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const client = new QueryClient();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen
              name="settings"
              options={{
                presentation:
                  Platform.OS === "web" ? "transparentModal" : "modal",
              }}
            />
            <Stack.Screen
              name="news/[id]"
              options={{
                presentation:
                  Platform.OS === "web" ? "transparentModal" : "modal",
              }}
            />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
