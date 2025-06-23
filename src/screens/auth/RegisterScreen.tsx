import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {RootStackParamList} from '../../types/navigationType';
import AuthHeader from '../../components/Auth/AuthHeader';
import OutlineRoundedButton from '../../components/buttons/OutlineRoundedButton';
import {FC} from 'react';
import TermsAndPrivacyText from '../../components/common/Terms';
import RegisterForm from '../../components/Auth/RegisterForm';
import KeyboardAvoidingContainer from '../../components/common/KeyboardAvoidingContainer';
import GoogleSvg from '../../../assets/svg/Google';
import AppleSvg from '../../../assets/svg/Apple';


type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: FC<Props> = () => {
  return (
    <KeyboardAvoidingContainer>
      <AuthHeader title={'Sign Up for your Account'} />
      <View className="rounded-2xl p-5 mx-8 mt-[58px] bg-bgColor">
        <OutlineRoundedButton
          title={'Continue with Google'}
          className={'mb-3'}
          onPress={() => {}}
          Icon={GoogleSvg}
          iconHeight={20}
          iconWidth={20}
        />
        <OutlineRoundedButton
          title={'Continue with Apple'}
          className={'mb-3'}
          onPress={() => {}}
          Icon={AppleSvg}
          iconHeight={20}
          iconWidth={20}
        />
        <RegisterForm />
      </View>
      <TermsAndPrivacyText />
    </KeyboardAvoidingContainer>
  );
};

export default RegisterScreen;
