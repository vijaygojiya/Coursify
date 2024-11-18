import {AppState, AppStateStatus, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from '@/router/AppNavigator';
import '@/translations';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AuthProvider} from '@/context';
import {focusManager, QueryClient} from '@tanstack/react-query';
import {fireAuth} from '@/services/firebase';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {clientPersister} from '@/services/storage';
import {useOnlineManager} from '@/hooks';
import colors from '@/styles/colors';

const s = {flex: 1};

focusManager.setEventListener(onFocus => {
  const subscription = AppState.addEventListener(
    'change',
    (status: AppStateStatus) => {
      onFocus(status === 'active');
    },
  );

  return () => subscription.remove();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      structuralSharing: false,
      retry: false,
    },
  },
});

const App = () => {
  useOnlineManager();

  useEffect(() => {
    fireAuth.facebookSettings();
    fireAuth.configureGoogleSignin();
  }, []);

  return (
    <View style={s}>
      <PersistQueryClientProvider
        persistOptions={{
          persister: clientPersister,
          dehydrateOptions: {shouldDehydrateMutation: () => false},
        }}
        client={queryClient}>
        <AuthProvider>
          <StatusBar
            backgroundColor={colors.neutral10}
            barStyle="dark-content"
          />
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppNavigator />
          </SafeAreaProvider>
        </AuthProvider>
      </PersistQueryClientProvider>
    </View>
  );
};

export default App;
