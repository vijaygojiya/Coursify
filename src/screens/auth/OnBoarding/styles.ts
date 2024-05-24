import {StyleSheet} from 'react-native';
export const DOT_SIZE = 8;
export const DOT_SPACING = 8;
export const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 55,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingVertical: 8,
    paddingHorizontal: 22,
  },
  ringCircle: {
    position: 'absolute',
    alignSelf: 'center',
    left: -DOT_SIZE / 2,
    zIndex: 2,
    height: DOT_INDICATOR_SIZE,
    width: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    // borderColor: colors.borderColor,
  },
  dot: {
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    // backgroundColor: colors.primary,
    marginEnd: DOT_SPACING,
  },
  spacer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  title: {
    marginTop: 55,
    alignSelf: 'center',
    marginBottom: 12,
    textAlign: 'center',
  },
  subTitle: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnContainer: {marginTop: 56},
});
export default styles;
