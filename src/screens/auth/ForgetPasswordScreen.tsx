import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {RootStackParamList} from '../../types/navigationType';
import AuthHeader from '../../components/Auth/AuthHeader';
import {FC} from 'react';

import ForgetPasswordForm from '../../components/Auth/ForgetPasswordForm';
import KeyboardAvoidingContainer from '../../components/common/KeyboardAvoidingContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgetPassword'>;

const ForgetPasswordScreen: FC<Props> = () => {
  return (
    <KeyboardAvoidingContainer>
      <AuthHeader title={'Forget your password'} />
      <View className="rounded-2xl p-5 mx-8 mt-[58px] bg-bgColor">
        <ForgetPasswordForm />
      </View>
    </KeyboardAvoidingContainer>
  );
};

export default ForgetPasswordScreen;
