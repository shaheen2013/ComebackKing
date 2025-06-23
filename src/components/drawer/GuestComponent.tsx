import {Text, View} from 'react-native';
import HistorySvg from '../../../assets/svg/History';
import PrimaryButton from '../buttons/PrimaryButton';
import {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavProp} from '../../types/navigationType';

const GuestComponent: FC = () => {
  const navigation = useNavigation<RootStackNavProp<'Login'>>();
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <HistorySvg />
        <Text className="font-DMSerRegular text-[22px] mt-2 mb-1">
          No History Yet
        </Text>
        <Text className="w-[60%] text-center text-[13px] font-SF font-[400] text-sndTextColor">
          Log In or Sign up to get access your history
        </Text>
      </View>
      <View className="mx-3">
        <Text className="text-[15px] font-normal font-SF mb-2 text-sndTextColor leading-5">
          To save your insights, share effortlessly, and personalize your AI
          experience.
        </Text>
        <PrimaryButton
          title="Log In"
          onPress={() => {
            navigation.navigate('Login');
          }}
          className={'w-full rounded-xl overflow-hidden mt-1'}
        />
      </View>
    </>
  );
};

export default GuestComponent;
