import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {RootStackParamList} from '../../types/navigationType';
import AuthHeader from '../../components/Auth/AuthHeader';
import {FC} from 'react';

import ResetPasswordForm from '../../components/Auth/ResetPasswordForm';
import KeyboardAvoidingContainer from '../../components/common/KeyboardAvoidingContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: FC<Props> = ({
  route,
}: {
  route: {params: {email: string}};
}) => {
  const {email} = route?.params;
  return (
    <KeyboardAvoidingContainer>
      <AuthHeader title={'Set Your Account Password'} />
      <View className="rounded-2xl p-5 mx-8 mt-[58px] bg-bgColor">
        <ResetPasswordForm email={email} />
      </View>
    </KeyboardAvoidingContainer>
  );
};

export default ResetPasswordScreen;
