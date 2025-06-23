import {FC} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RootState} from '../../features/store';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {ProfileStackParamList} from '../../types/navigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ProfileCard: FC = () => {
  const {profile} = useSelector((state: RootState) => state.profile);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ProfileStackParamList, 'Profile'>
    >();
  return (
    <TouchableOpacity
      className="bg-bgColor p-4 mx-4 rounded-2xl flex flex-row gap-x-3 items-center"
      onPress={() => navigation.navigate('Profile')}>
      <View className="w-[54px] h-[54px] rounded-full overflow-hidden bg-deepPink flex justify-center items-center">
        <Image
          source={{uri: profile?.profile_image}}
          width={54}
          height={54}
          className="rounded-full"
        />
      </View>
      <View>
        <Text className="font-SF text-[17px] text-textColor font-bold leading-[22px]">
          {profile?.name}
        </Text>
        <View className="flex-row items-center">
          <Text className="underline font-SF font-normal text-[15px] text-sndTextColor">
            Free
          </Text>
          <FontAwesome
            name="angle-right"
            size={16}
            color={'#465977'}
            className="text-sndTextColo p-1"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
