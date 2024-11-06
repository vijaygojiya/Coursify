import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  mainContentContainer: {
    paddingBottom: 18,
    rowGap: 16,
  },

  headerContainer: {
    marginHorizontal: 18,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    fontFamily: fonts.regular,
  },
});
export default styles;
