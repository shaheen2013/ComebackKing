import {Image, Text, TouchableOpacity, View} from 'react-native';
import {RootState} from '../../features/store';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigationType';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const DrawerAuthFooter = () => {
  const {profile} = useSelector((state: RootState) => state.profile);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View className="border-t border-deepGray flex flex-row items-center px-4 py-3 gap-x-2 pb-5">
      <TouchableOpacity
        className="h-12 w-12 bg-deepPink rounded-full overflow-hidden flex justify-center items-center"
        onPress={() => navigation.navigate('Drawer', {screen: 'ProfileStack'})}>
        {/* <Image source={require('../../../assets/images/avatar.png')} /> */}
        <Image source={{uri: profile?.profile_image}} height={48} width={48} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Drawer', {screen: 'ProfileStack'})}>
        <Text className="text-[16px] font-normal font-SF text-textColor">
          {profile?.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerAuthFooter;
