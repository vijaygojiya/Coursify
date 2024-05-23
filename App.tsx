import {View} from 'react-native';
import React from 'react';
import AppNavigator from './src/router/AppNavigator';

const s = {flex: 1};

const App = () => {
  return (
    <View style={s}>
      <AppNavigator />
    </View>
  );
};

export default App;
