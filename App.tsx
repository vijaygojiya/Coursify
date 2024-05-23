import {View} from 'react-native';
import React from 'react';
import AppNavigator from '@/router/AppNavigator';
import '@/translations';
const s = {flex: 1};

const App = () => {
  return (
    <View style={s}>
      <AppNavigator />
    </View>
  );
};

export default App;
