import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, Text, View} from 'react-native';
import {RootStackNavProp, RootStackParamList} from '../../types/navigationType';
import {FC} from 'react';
import RoundedRadialCheckmark from '../../components/common/RoundedRadialCheckmark';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

const ResetSuccessfulScreen: FC<Props> = () => {
  const navigation = useNavigation<RootStackNavProp<'Login'>>();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 items-center mt-[104px] p-4 justify-between">
        <View className="flex justify-center items-center">
          <RoundedRadialCheckmark />
          <Text className="font-DMSerRegular text-[28px] text-center mt-6 text-textColor">
            Reset Successfully!
          </Text>
          <Text className="text-sndTextColor text-[13px] font-SF font-normal text-center mt-4">
            Your OTP has been successfully updated. Secure access for your
            financial transactions is ensured.
          </Text>
        </View>
        <PrimaryButton
          title={'Continue'}
          className={''}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetSuccessfulScreen;
