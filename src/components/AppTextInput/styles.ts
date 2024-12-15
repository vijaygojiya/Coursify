import {textStyles} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  labelText: {
    ...textStyles.bodySmall,
    marginBottom: 8,
  },
  textInput: {
    ...textStyles.bodyLarge,
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  rowContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  error: {
    ...textStyles.bodySmall,
    marginTop: 4,
  },
});

export default styles;
