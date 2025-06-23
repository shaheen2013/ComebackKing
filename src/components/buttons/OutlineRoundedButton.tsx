/* eslint-disable quotes */
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';

import {cn} from '../../common/cn';

type OutlineRoundedButtonProps = {
  title: string;
  className?: string;
  onPress?: (event: GestureResponderEvent) => void;
  Icon?: React.FC<{width?: number; height?: number}>;
  iconHeight?: number;
  iconWidth?: number;
};

const OutlineRoundedButton: React.FC<OutlineRoundedButtonProps> = ({
  title,
  className,
  onPress,
  Icon,
  iconHeight = 20,
  iconWidth = 20,
}) => {
  return (
    <TouchableOpacity
      className={cn(
        'py-[14px] flex flex-row justify-center items-center gap-x-2 rounded-xl border border-borderColor',
        className,
      )}
      onPress={onPress}>
      {Icon && <Icon height={iconHeight} width={iconWidth} />}
      <Text className="font-SF text-[16px] font-bold text-sndTextColor leading-[21px]">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default OutlineRoundedButton;
