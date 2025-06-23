// components/common/CircularProgress.tsx
import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type CircularProgressProps = {
  progress: number; // 0 - 100
  radius?: number;
  strokeWidth?: number;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  radius = 50,
  strokeWidth = 10,
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const size = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (normalizedProgress / 100) * circumference;

  return (
    <View
      className="items-center justify-center"
      style={{width: size, height: size}}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={radius}
          cy={radius}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#3b82f6"
          fill="none"
          cx={radius}
          cy={radius}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${radius}, ${radius}`}
        />
      </Svg>
      <View className="absolute items-center">
        <Text className="text-[14px] font-semibold text-gray-700">
          Downloading
        </Text>
        <Text className="text-[16px] font-bold text-blue-500">
          {normalizedProgress}%
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;
