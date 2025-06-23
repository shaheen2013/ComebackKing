import React, {useRef, useState} from 'react';
import {
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {slides} from '../../types/onboarding';
import Slide from '../../components/onboarding/Slide';

const {width} = Dimensions.get('window');

const Pagination = ({
  currentIndex,
  scrollTo,
}: {
  currentIndex: number;
  scrollTo: (index: number) => void;
}) => {
  return (
    <View className="absolute bottom-16 flex flex-row  px-3 py-2 bg-[#F0E9FD] self-center rounded-[50px]">
      {slides.map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => scrollTo(index)}
          className="active:opacity-70">
          <View
            className={`
            w-[12px] h-[12px] bg-active rounded-full mx-2
            ${currentIndex === index ? 'bg-active' : ' bg-pointColor'}
          `}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<{index: number | null}>}) => {
      const firstIndex = viewableItems[0]?.index;
      setCurrentIndex(
        firstIndex !== null && firstIndex !== undefined ? firstIndex : 0,
      );
    },
  ).current;

  const scrollTo = (index: number) => {
    if (index >= 0 && index < slides.length) {
      if (slidesRef.current) {
        slidesRef.current.scrollToIndex({index});
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={slides}
        renderItem={({item}) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={viewableItemsChanged}
        ref={slidesRef}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <Pagination currentIndex={currentIndex} scrollTo={scrollTo} />
    </View>
  );
};

export default OnboardingScreen;
