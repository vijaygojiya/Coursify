import React, {useEffect} from 'react';
import {AppNavigator} from './navigation';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {AuthProvider} from './contexts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Toaster} from 'sonner-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {configureGoogleSignin} from './services/firebase';
import {StatusBar} from 'react-native';

const GHRView = {flex: 1};

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    configureGoogleSignin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView style={GHRView}>
            <KeyboardProvider>
              <StatusBar barStyle="dark-content" />
              <AppNavigator />
              <Toaster />
            </KeyboardProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
