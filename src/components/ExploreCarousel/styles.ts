import {StyleSheet} from 'react-native';

const containerWith = 70;
const indicatorWidth = containerWith / 3;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    // backgroundColor: colors.GrayBorder,
  },
  //item

  itemContainer: {
    paddingHorizontal: 10,
    height: 166,
    overflow: 'hidden',
  },
  itemImage: {
    height: '100%',
    width: '100%',
    // backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  indicatorContainer: {
    width: containerWith,
    height: 5,
    borderRadius: 18,
    alignSelf: 'center',
    // backgroundColor: colors.InActiveSlider,
  },
  indicator: {
    height: '100%',
    width: indicatorWidth,
    // backgroundColor: colors.primary,
    borderRadius: 8,
  },
  contentContainerStyle: {
    paddingVertical: 18,
  },
});
export default styles;
