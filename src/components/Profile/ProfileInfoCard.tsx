import {useSelector} from 'react-redux';
import {RootState} from '../../features/store';
import {View, Text} from 'react-native';
import {FC} from 'react';

const ProfileInfoCard: FC = () => {
  const {profile} = useSelector((state: RootState) => state.profile);

  return (
    <View className="bg-bgColor my-4  rounded-2xl flex flex-row gap-x-3 items-center">
      <View className="w-full">
        <View className="border-b border-borderColor p-3">
          <Text className="text-SF text-[15px] font-medium leading-5 text-textColor">
            {profile?.email}
          </Text>
          <Text className="text-SF text-[13px] font-normal leading-[18px] text-sndTextColor mt-1">{`Linked Account`}</Text>
        </View>
        <View className="flex flex-row  justify-between items-center p-3">
          <Text className="text-SF text-[15px] font-medium leading-5 text-textColor">
            Free Plan
          </Text>
          <Text className='className="text-SF text-[13px] font-normal leading-[18px] text-sndTextColor'>
            Upgrade
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfoCard;
