import {textStyles} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 14,
  },
  title: {
    ...textStyles.labelLarge,
    lineHeight: 20,
  },
});
export default styles;
