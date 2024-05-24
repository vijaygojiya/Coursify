import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    letterSpacing: 0.5,
    lineHeight: 23,
    textTransform: 'capitalize',
  },
  animateBgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
  },
});
export default styles;
