import {View} from 'react-native';
import DiplomatIconBig from '../../../assets/svg/DiplomatIconBig';
import RadialCircle from '../../../assets/svg/RadialCircle';

const DiplomatLogoIcon = () => {
  return (
    <View className="h-[100px] w-[100px] rounded-full flex-1 items-center justify-center relative">
      <View className="absolute z-10">
        <DiplomatIconBig height={40} width={40} />
      </View>
      <RadialCircle />
    </View>
  );
};

export default DiplomatLogoIcon;
