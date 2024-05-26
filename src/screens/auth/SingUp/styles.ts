import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 33,
    fontFamily: fonts.semiBold,
    marginTop: 48,
    marginBottom: 8,
  },
  coursify: {
    fontFamily: fonts.bold,
  },

  loginTitle: {
    marginTop: 48,
    fontSize: 22,
    fontFamily: fonts.semiBold,
    marginBottom: 28,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    fontFamily: fonts.regular,
    marginBottom: 24,
  },
  createNewText: {
    textDecorationLine: 'underline',
    fontFamily: fonts.bold,
  },
  spacer: {flex: 1},
});
export default styles;
