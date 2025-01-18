import {StyleSheet} from 'react-native';

const containerWith = 70;
const indicatorWidth = containerWith / 3;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  itemContainer: {
    paddingHorizontal: 10,
    height: 166,
    overflow: 'hidden',
  },
  itemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  indicatorContainer: {
    width: containerWith,
    height: 5,
    borderRadius: 18,
    alignSelf: 'center',
  },
  indicator: {
    height: '100%',
    width: indicatorWidth,
    borderRadius: 8,
  },
});
export default styles;
