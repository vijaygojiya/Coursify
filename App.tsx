import {AppStateStatus, Platform, StatusBar, View} from 'react-native';
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
import {useAppState, useOnlineManager} from '@/hooks';
import colors from '@/styles/colors';

const s = {flex: 1};

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const App = () => {
  useOnlineManager();
  useAppState(onAppStateChange);

  useEffect(() => {
    fireAuth.facebookSettings();
    fireAuth.configureGoogleSignin();
  }, []);

  return (
    <View style={s}>
      <PersistQueryClientProvider
        persistOptions={{persister: clientPersister}}
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
