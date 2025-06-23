import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import LogoMedium from '../../../assets/svg/LogoMedium';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {GestureResponderEvent} from 'react-native';

const DrawerHeader = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View className="flex flex-row justify-between items-center mx-2">
      <View className="flex flex-row gap-x-2 items-center">
        {Platform.OS === 'ios' ? (
          <LogoMedium />
        ) : (
          <Image
            source={require('../../../assets/images/logo_55_46.png')}
            width={55}
            height={46}
            className="rounded-full"
          />
        )}
        <Text className="font-SF font-semibold text-[20px] leading-6">
          Comeback King
        </Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <EvilIcons name="close" size={24} className="text-textColor" />
      </TouchableOpacity>
    </View>
  );
};
export default DrawerHeader;
