import {AppFonts} from '@/styles';
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
    fontFamily: AppFonts.regular,
  },
  notificationIcon: {
    borderWidth: 1.4,
    borderRadius: 8,
    padding: 3,
  },
  flex1: {flex: 1},
});
export default styles;
