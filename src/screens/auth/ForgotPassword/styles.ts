import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 33,
    // color: colors.black,
    fontFamily: fonts.semiBold,
    marginTop: 48,
    marginBottom: 8,
  },

  subtitle: {
    marginTop: 48,
    fontSize: 22,
    // color: colors.black,
    fontFamily: fonts.semiBold,
    marginBottom: 28,
  },
});

export default styles;
