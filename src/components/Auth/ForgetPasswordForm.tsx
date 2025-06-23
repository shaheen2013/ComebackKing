import {useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {ForgetPasswordFormInputs} from '../../types/formType';
import PrimaryButton from '../buttons/PrimaryButton';
import InputTextField from '../inputs/InputTextField';
import TextButton from '../buttons/TextButton';
import {RootStackNavProp} from '../../types/navigationType';
import {useNavigation} from '@react-navigation/native';
import {useRequestResetPasswordMutation} from '../../features/auth/authSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

const ForgetPasswordForm = () => {
  const navigation = useNavigation<RootStackNavProp<'ForgetPassword'>>();
  const [requestResetPassword, {isLoading}] = useRequestResetPasswordMutation();
  const {handleSubmit, control, reset, setError} =
    useForm<ForgetPasswordFormInputs>({
      mode: 'onTouched',
      defaultValues: {
        email: '',
      },
    });

  const onSubmit = async (data: ForgetPasswordFormInputs) => {
    try {
      const result = await requestResetPassword({...data});
      if (result?.error) {
        if ('data' in (result?.error || {})) {
          let errMsg = (
            result.error as FetchBaseQueryError & {data: {detail?: string}}
          ).data?.detail;
          setError('email', {
            type: 'manual',
            message: errMsg,
          });
        }
        return;
      }
      if (result?.data) {
        reset();
        navigation.navigate('OTP', {email: data?.email,expires_in: result?.data?.expires_in});
      }
    } catch (err: unknown) {

    }

    // Perform login action here
  };
  return (
    <View className="">
      <Text className="font-DMSerRegular mb-3 text-textColor text-xl font-normal text-center">
        Reset your Password
      </Text>
      <Text className="font-SF mb-1 text-sndTextColor text-[13px] font-normal text-center">
        {
          'Enter your email. and we’ll send you instructions on how to reset your password.'
        }
      </Text>
      <View className="py-3">
        <InputTextField
          name="email"
          placeholder="Email"
          className=""
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email is invalid',
            },
          }}
          type="email"
        />

        <PrimaryButton
          title={'Send OTP'}
          className={''}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
        <TextButton
          title={'Back to login page'}
          onPress={() => {
            navigation.navigate('Login');
          }}
          className="text-[11px] font-SF font-normal text-center"
          btnClassName="mt-2 self-center"
        />
      </View>
    </View>
  );
};

export default ForgetPasswordForm;
