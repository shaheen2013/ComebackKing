import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {LoginFormInputs} from '../../types/formType';
import PrimaryButton from '../buttons/PrimaryButton';
import InputTextField from '../inputs/InputTextField';
import TextButton from '../buttons/TextButton';
import {RootStackNavProp} from '../../types/navigationType';
import {useNavigation} from '@react-navigation/native';
import {useSigninMutation} from '../../features/auth/authSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {storeToken} from '../../utils/TokenManagement';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../../features/auth/authState';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavProp<'Register'>>();
  const [login, {isLoading}] = useSigninMutation();
  const {handleSubmit, control, reset, setError} = useForm<LoginFormInputs>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    // Perform login action here
    try {
      const result = await login({
        ...data,
      });
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
        dispatch(setAuthentication(true));
        storeToken(result?.data?.access_token);
        reset();
        navigation.replace('Drawer', {screen: 'Home'});
      }
    } catch (error) {}
  };
  return (
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
      <InputTextField
        name="password"
        placeholder="Password"
        className=""
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
        type="password"
      />
      <TextButton
        title={'Forget Password?'}
        onPress={() => navigation.navigate('ForgetPassword')}
        // onPress={() => navigation.navigate('ResetSuccessful')}
        className="text-[11px] font-SF font-normal"
        btnClassName="mb-3 self-end"
        btnTextColor={'text-sndTextColor'}
        opacityColor={'text-gray-400'}
      />
      <PrimaryButton
        title={'Log in'}
        // className={'w-full rounded-xl overflow-hidden'}
        className={''}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
      <TextButton
        title={'Don’t have an account?'}
        onPress={() => {
          navigation.navigate('Register');
        }}
        className="text-[11px] font-SF font-normal text-center"
        btnClassName="mt-3 self-center"
      />
    </View>
  );
};

export default LoginForm;
