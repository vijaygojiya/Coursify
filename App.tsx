import {View} from 'react-native';
import React from 'react';
import AppNavigator from '@/router/AppNavigator';
import '@/translations';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AuthProvider} from '@/context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const s = {flex: 1};

const queryClient = new QueryClient();

const App = () => {
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
