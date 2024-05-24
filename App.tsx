import {View} from 'react-native';
import React from 'react';
import AppNavigator from '@/router/AppNavigator';
import '@/translations';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
const s = {flex: 1};

const App = () => {
  return (
    <View style={s}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator />
      </SafeAreaProvider>
    </View>
  );
};

export default App;
