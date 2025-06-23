import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {modelItem} from '../../types/model'; // Ensure this import is correct

import {cn} from '../../common/cn';

const ModelItem = ({
  item,
  activeModel,
  setActiveModel,
}: {
  item: modelItem;
  activeModel: modelItem | null;
  setActiveModel: (model: modelItem) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => setActiveModel(item)}
      className={cn(
        'mr-2 py-[6px] px-[16px] rounded-md',
        activeModel?.id === item?.id
          ? 'bg-lightBlue border border-blueBorder'
          : 'bg-bgColor',
      )}>
      <Text
        className={cn(
          'font-SF text-[13px] font-normal',
          activeModel?.id === item?.id ? 'text-textColor' : 'text-sndTextColor',
        )}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};

export default ModelItem;
