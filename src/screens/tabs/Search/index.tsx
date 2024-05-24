import {Text, View} from 'react-native';
import React from 'react';
import {TabScreensProps} from '@/types/navigation';

const Search = ({}: TabScreensProps<'Search'>) => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default Search;
