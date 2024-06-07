import {View} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from '@/router/AppNavigator';
import '@/translations';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AuthProvider} from '@/context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {fireAuth} from '@/services/firebase';
const s = {flex: 1};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    fireAuth.facebookSettings();
    fireAuth.configureGoogleSignin();
  }, []);
  return (
    <View style={s}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppNavigator />
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </View>
  );
};

export default App;
