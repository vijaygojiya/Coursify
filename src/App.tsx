import React, {useEffect} from 'react';
import {AppNavigator} from './navigation';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Toaster} from 'sonner-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient} from '@tanstack/react-query';
import {configureGoogleSignin} from './services/firebase';
import {StatusBar} from 'react-native';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {clientPersister} from './utils/persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const App = () => {
  //

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: clientPersister}}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView>
          <KeyboardProvider>
            <StatusBar barStyle="dark-content" />
            <AppNavigator />
            <Toaster />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
};

export default App;
