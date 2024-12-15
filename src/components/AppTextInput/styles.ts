import {FontsSize} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  labelText: {
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: FontsSize.Headline,
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  rowContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
