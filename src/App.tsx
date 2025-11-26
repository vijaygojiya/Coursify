import React, { useEffect, useState } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { focusManager } from "@tanstack/react-query";
import { configureGoogleSignin } from "./services/supabase";
import { AppStateStatus, Platform, StatusBar } from "react-native";
import { useAppState, useOnlineManager } from "./hooks";
import { AuthProvider } from "./contexts";
import { QueryProvider } from "./utils";
import { AnimatedBootSplash } from "./components";
import AppNavigator from "./navigation/AppNavigator";

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const App = () => {
  //
  useOnlineManager();
  const [visible, setVisible] = useState(true);

  useAppState(onAppStateChange);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  return (
    <QueryProvider>
      <AuthProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView>
            <KeyboardProvider>
              <StatusBar barStyle="dark-content" />
              <AppNavigator />
              {visible && (
                <AnimatedBootSplash
                  onAnimationEnd={() => {
                    setVisible(false);
                  }}
                />
              )}
              <Toaster />
            </KeyboardProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
