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
});

export default styles;
