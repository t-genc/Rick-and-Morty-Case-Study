import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { Container } from "~/components/Container";
import { useNetworkState } from "~/hooks/useNetworkState";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

export default function Layout() {
  const [loaded] = useFonts({
    NunitoRegular: require("../assets/fonts/nunito/Nunito-Regular.ttf"),
    NunitoBold: require("../assets/fonts/nunito/Nunito-Bold.ttf"),
    NunitoBlack: require("../assets/fonts/nunito/Nunito-Black.ttf"),
    NunitoExtraBold: require("../assets/fonts/nunito/Nunito-ExtraBold.ttf"),
    NunitoMedium: require("../assets/fonts/nunito/Nunito-Medium.ttf"),
    NunitoItalic: require("../assets/fonts/nunito/Nunito-Italic.ttf"),
  });
  const networkState = useNetworkState();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    if (!networkState.isConnected) {
      Toast.show({
        type: "error",
        text1: "No Internet Connection",
        text2: "You are offline. Please check your internet connection.",
        autoHide: true,
        position: "top",
        visibilityTime: 3000,
      });
    }
  }, [networkState]);

  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Container>
      <Toast />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
