import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginTop: 4,
  },
  labelText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginStart: 8,
    marginBottom: 6,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
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
    fontFamily: fonts.regular,
    color: 'red',
    marginTop: 2,
    opacity: 0.8,
    marginStart: 8,
  },
});

export default styles;
