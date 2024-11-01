import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingVertical:16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
});
export default styles;
