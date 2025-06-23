import {TouchableOpacity, Text} from 'react-native';
import {cn} from '../../common/cn';
import LinearGradient from 'react-native-linear-gradient';

const RoundedButton = ({title, className, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} className={cn('ml-auto', className)}>
      <LinearGradient
        colors={['#A97FF3', '#6A23EA']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        className="rounded-full">
        <Text className="text-white text-sm font-medium text-center px-6 py-3">
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RoundedButton;
