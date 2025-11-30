import { View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from "react-native-reanimated";
import CarouselIndicator from "../CarouselIndicator";
import CarouselItem from "../CarouselItem";

const ExploreCarousel = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(animatedRef);
  const width = useWindowDimensions().width;

  const translateX = useDerivedValue(() => {
    return scrollOffset.value / width;
  });

  return (
    <View>
      <Animated.ScrollView
        bounces={false}
        overScrollMode="never"
        ref={animatedRef}
        decelerationRate={"normal"}
        scrollEventThrottle={16}
        pagingEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {[1, 2, 3].map((_, index) => {
          return (
            <CarouselItem key={index + "-explore-carouse-item"} index={index} />
          );
        })}
      </Animated.ScrollView>
      <CarouselIndicator animatedX={translateX} />
    </View>
  );
};

export default ExploreCarousel;
