import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {cn} from '../../common/cn';
import LinearGradient from 'react-native-linear-gradient';
import {FC} from 'react';

type PrimaryButtonProps = {
  title: string;
  className?: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  className = '',
  onPress,
  loading,
  disabled,
}) => {
  return (
    <LinearGradient
      colors={['#A97FF3', '#6A23EA']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      className={cn(className, '')}
      style={s.container}>
      <TouchableOpacity
        onPress={onPress}
        disabled={loading || disabled}
        className="py-[14px] flex flex-row justify-center items-center w-full h-[48px]">
        {!loading ? (
          <Text className="font-SF text-white text-base font-bold text-center">
            {title}
          </Text>
        ) : (
          <ActivityIndicator size={'small'} color={'white'} />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PrimaryButton;

const s = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginTop: 12,
    width: '100%',
  },
});
