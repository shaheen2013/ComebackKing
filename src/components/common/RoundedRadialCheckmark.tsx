/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Animated, Easing} from 'react-native';
import {useEffect, useRef} from 'react';
import RadialCircle from '../../../assets/svg/RadialCircle';
import Icon from 'react-native-vector-icons/Feather';

const RoundedRadialCheckmark = () => {
  const drawProgress = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: 1,
        duration: 800,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(drawProgress, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const verticalOffset = drawProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [50, 25, 0], // Start 50px below, animate to original position
  });

  const circleRotation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="h-[100px] w-[100px] rounded-full bg-[#00EAFF] flex items-center justify-center relative">
      <Animated.View style={{transform: [{rotate: circleRotation}]}}>
        <RadialCircle />
      </Animated.View>

      {/* Checkmark container with vertical clipping mask */}
      <View className="absolute h-[50px] w-[50px] overflow-hidden">
        <Animated.View
          style={{
            transform: [{translateY: verticalOffset}],
          }}>
          <Icon name="check" size={50} color="#FFFFFF" />
        </Animated.View>
      </View>
    </View>
  );
};

export default RoundedRadialCheckmark;
