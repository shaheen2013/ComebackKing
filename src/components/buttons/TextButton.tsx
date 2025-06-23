import {Text} from 'react-native';
import {Pressable} from 'react-native';
import {cn} from '../../common/cn';
import {FC} from 'react';

type TextButtonProps = {
  title: string;
  btnTextColor?: string;
  opacityColor?: string;
  onPress: () => void;
  className?: string;
  btnClassName?: string;
  disabled?: boolean;
  loading?: boolean;
};

const TextButton: FC<TextButtonProps> = ({
  title,
  btnTextColor = 'text-textColor',
  opacityColor = 'text-gray-400',
  onPress,
  className = '',
  btnClassName = '',
  disabled = false,
  loading = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn('', btnClassName)}
      disabled={disabled || loading}>
      {({pressed}) => (
        <Text
          className={cn('', pressed ? opacityColor : btnTextColor, className)}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default TextButton;
