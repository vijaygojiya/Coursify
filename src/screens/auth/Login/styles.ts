import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    marginTop: 48,
    marginBottom: 8,
  },
  coursify: {
    fontFamily: fonts.bold,
  },

  loginTitle: {
    marginTop: 48,
    marginBottom: 28,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginVertical: 6,
  },
  footerText: {
    alignSelf: 'center',
    marginHorizontal: 20,
    fontFamily: fonts.regular,
    marginBottom: 24,
  },
  createNewText: {
    textDecorationLine: 'underline',
    fontFamily: fonts.bold,
  },
  spacer: {flex: 1},
  socialIconContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    columnGap: 18,
    marginVertical: 8,
  },
  socialIcon: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 28,
  },
});
export default styles;
