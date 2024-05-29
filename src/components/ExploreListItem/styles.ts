import {fonts} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 262,
    elevation: 8,
    marginBottom: 22,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
  title: {
    marginHorizontal: 14,
    marginTop: 12,
    fontFamily: fonts.bold,
    marginBottom: 4,
  },
  instructor: {
    marginHorizontal: 14,
    fontFamily: fonts.medium,
  },
  footerContainer: {
    marginVertical: 12,
    marginHorizontal: 10,
    columnGap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
});
export default styles;
