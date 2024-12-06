import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerLeftIconContainer: {marginEnd: 24},
  tabBarStyle: {
    paddingTop: 10,
    elevation: undefined,
  },

  title: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 22,
    letterSpacing: 0.5,
    lineHeight: 30,
  },
  appBarTitle: {
    fontFamily: fonts.medium,
    fontSize: 24,
    textAlign: 'center',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  profileContainer: {
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {flex: 1},
  profileImage: {
    height: 74,
    width: 74,
    borderRadius: 74 / 2,
  },

  text: {
    fontFamily: fonts.medium,
    fontSize: 18,
  },
  email: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  bio: {
    fontFamily: fonts.medium,
    fontSize: 14,
    paddingVertical: 8,
  },
});

export default styles;
