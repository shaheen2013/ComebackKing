import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, View} from 'react-native';
import {RootStackParamList} from '../../types/navigationType';
import AuthHeader from '../../components/Auth/AuthHeader';
import {FC} from 'react';
import OTPForm from '../../components/Auth/OTPForm';

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const OTPScreen: FC<Props> = ({
  route,
}: {
  route: {params: {email: string; expires_in: number}};
}) => {
  const {email, expires_in} = route?.params;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AuthHeader title={'Enter your OTP Code'} />
      <View className="rounded-2xl p-5 mx-8 mt-[58px] bg-bgColor">
        <OTPForm email={email} expires_in={expires_in}/>
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;
