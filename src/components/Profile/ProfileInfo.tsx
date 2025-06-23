import {FC} from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../features/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUpdateProfileMutation} from '../../features/profile/profileSlice';
import {setProfile} from '../../features/profile/profileState';

interface ProfileInfoProps {
  handleOpenChangeName?: () => void;
}

const ProfileInfo: FC<ProfileInfoProps> = ({handleOpenChangeName}) => {
  const dispatch = useDispatch();
  const {profile} = useSelector((state: RootState) => state.profile);
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  const handleChoosePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1, quality: 0.5},
      async (response: any) => {
        if (response.didCancel) {
          return;
        }

        const imageSize = response.assets[0]?.fileSize;
        // Check if the file size exceeds 5MB (5 * 1024 * 1024 bytes)
        if (imageSize && imageSize > 1 * 1024 * 1024) {
          Alert.alert(
            'Error',
            'The selected image exceeds the 1MB size limit.',
          );
          return;
        }

        const image = response.assets[0];
        if (image) {
          const data = new FormData();
          data.append('profile_image', {
            name: image.fileName,
            type: image.type,
            uri:
              Platform.OS === 'ios'
                ? image.uri.replace('file://', '')
                : image.uri,
          });

          try {
            const updateResponse = await updateProfile(data);
            dispatch(setProfile(updateResponse?.data));
            Alert.alert('Updated Profile picture successfully');
          } catch (err: any) {
            Alert.alert('Profile Picture Updated failed');
          }
        }
      },
    );
  };
  return (
    <View className="flex justify-center w-full items-center">
      <View className="relative">
        <View className="w-[60px] h-[60px] rounded-full overflow-hidden bg-deepPink flex justify-center items-center">
          <Image
            source={{uri: profile?.profile_image}}
            width={54}
            height={54}
            className="rounded-full"
          />
        </View>
        <TouchableOpacity
          className="bg-white rounded-full absolute bottom-[2px] -right-1 border border-borderColor p-[3px]"
          disabled={isLoading}
          onPress={() => {
            !isLoading && handleChoosePhoto();
          }}>
          <MaterialCommunityIcons
            size={16}
            name="lead-pencil"
            color={'#0F274F'}
          />
        </TouchableOpacity>
      </View>
      <Text className="text-[22px] font-DMSerRegular mt-3 font-normal leading-7">
        {profile?.name}
      </Text>
      <TouchableOpacity
        className="bg-sndTextColor py-2 px-3 rounded-full flex flex-row justify-between items-center gap-x-1 my-2"
        onPress={() => handleOpenChangeName && handleOpenChangeName()}>
        <Text className="font-SF text-[11px] leading-[13px] font-normal text-white">
          Upgrade
        </Text>
        <MaterialCommunityIcons size={16} name="lead-pencil" color={'white'} />
      </TouchableOpacity>
      <Text className="text-[13px] font-SF text-sndTextColor leading-[18px]">
        {profile?.email}
      </Text>
    </View>
  );
};

export default ProfileInfo;
