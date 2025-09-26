import {AppFonts, textStyles} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {flexGrow: 1, paddingHorizontal: 16},
  appTitle: {...textStyles.headlineMedium, marginVertical: 8},
  forgotPasswordContainer: {alignSelf: 'flex-end', marginBottom: 18},
  forgotPassword: textStyles.bodyMedium,
  footerText: {...textStyles.bodyMedium, textAlign: 'center'},
  createAccountText: {
    fontFamily: AppFonts.medium,
  },
  orRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginVertical: 18,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: textStyles.bodyLarge,
  spacer: {
    flex: 1,
  },
  socialIconContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    columnGap: 18,
    marginVertical: 8,
  },
  iconContainer: {
    paddingHorizontal: 28,
    paddingBlock: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
});
export default styles;
