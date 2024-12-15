import React from 'react';
import {AppNavigator} from './navigation';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {AuthProvider} from './contexts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Toaster} from 'sonner-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';

const GHRView = {flex: 1};

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={GHRView}>
          <KeyboardProvider>
            <AppNavigator />
            <Toaster />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
