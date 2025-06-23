import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerParamList} from '../../types/navigationType';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = {
  title: string;
};
type NavProp = NativeStackNavigationProp<DrawerParamList>;
const Header: FC<HeaderProps> = ({title}) => {
  const navigation = useNavigation<NavProp>();
  return (
    <View className="p-4 pt-0 flex flex-row gap-x-4 items-start">
      <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={16} />
      </TouchableOpacity>

      <Text className="font-DMSerRegular flex-1 text-textColor  font-normal text-[22px] leading-[28px]">
        {title}
      </Text>
    </View>
  );
};

export default Header;
