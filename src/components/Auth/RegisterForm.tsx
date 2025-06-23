import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {RegisterFormInputs} from '../../types/formType';
import PrimaryButton from '../buttons/PrimaryButton';
import InputTextField from '../inputs/InputTextField';
import TextButton from '../buttons/TextButton';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavProp} from '../../types/navigationType';
import {useRegisterMutation} from '../../features/auth/authSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

const RegisterForm = () => {
  const navigation = useNavigation<RootStackNavProp<'Login'>>();
  const [registration, {isLoading}] = useRegisterMutation();
  const {handleSubmit, control, reset, setError} = useForm<RegisterFormInputs>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    const payload = {...data, role: 'user'};
    try {
      const result = await registration(payload);
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
        navigation.replace('Login');
      }
    } catch (err) {
    }
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
      <InputTextField
        name="name"
        placeholder="Name"
        className=""
        control={control}
        rules={{
          required: 'Name is required',
        }}
        type="text"
      />
      <PrimaryButton
        title={'Continue'}
        // className={'w-full rounded-xl overflow-hidden mt-3'}
        className=""
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
      <TextButton
        title={'Already have an account?'}
        onPress={() => {
          navigation.navigate('Login');
        }}
        className="text-[11px] font-SF font-normal text-center"
        btnClassName="mt-3 self-center"
      />
    </View>
  );
};

export default RegisterForm;
