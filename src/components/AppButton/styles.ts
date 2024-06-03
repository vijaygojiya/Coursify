import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    letterSpacing: 0.5,
    lineHeight: 23,
    textTransform: 'capitalize',
  },
  animateBgContainer: {},
});
export default styles;
