import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigationType';
import AuthHeader from '../../components/Auth/AuthHeader';
import OutlineRoundedButton from '../../components/buttons/OutlineRoundedButton';
import {FC} from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import TermsAndPrivacyText from '../../components/common/Terms';
import KeyboardAvoidingContainer from '../../components/common/KeyboardAvoidingContainer';
import {View} from 'react-native';
import GoogleSvg from '../../../assets/svg/Google';
import AppleSvg from '../../../assets/svg/Apple';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = () => {
  return (
    <KeyboardAvoidingContainer>
      <AuthHeader title={'Log in to your Account'} />
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
        <LoginForm />
      </View>
      <TermsAndPrivacyText />
    </KeyboardAvoidingContainer>
  );
};

export default LoginScreen;
