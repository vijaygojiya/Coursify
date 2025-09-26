import React, { useEffect } from "react";
import { AppNavigator } from "./navigation";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { configureGoogleSignin } from "./services/firebase";
import { AppStateStatus, Platform, StatusBar } from "react-native";
import { useAppState, useOnlineManager } from "./hooks";
import * as Splash from "expo-splash-screen";
Splash.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      refetchOnWindowFocus: false,
      structuralSharing: false,
      retry: false,
    },
  },
});

const App = () => {
  //
  useOnlineManager();

  useAppState(onAppStateChange);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView>
          <KeyboardProvider>
            <StatusBar barStyle="dark-content" />
            <AppNavigator />
            <Toaster />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
