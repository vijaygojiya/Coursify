import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  title: {
    marginTop: 2,
    marginBottom: 8,
    marginStart: 18,
    fontFamily: fonts.bold,
  },
  listStyle: {flexGrow: 0},
  listContainer: {paddingHorizontal: 18, columnGap: 18},
});
export default styles;
