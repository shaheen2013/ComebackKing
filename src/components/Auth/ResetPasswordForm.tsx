import {useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {ResetPasswordFormInputs} from '../../types/formType';
import PrimaryButton from '../buttons/PrimaryButton';
import InputTextField from '../inputs/InputTextField';
import {RootStackNavProp} from '../../types/navigationType';
import {useNavigation} from '@react-navigation/native';
import {useResetPasswordMutation} from '../../features/auth/authSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

const ResetPasswordForm = ({email}: {email: string}) => {
  const navigation = useNavigation<RootStackNavProp<'ResetSuccessful'>>();
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const {handleSubmit, control, reset, setError, getValues} =
    useForm<ResetPasswordFormInputs>({
      mode: 'onTouched',
      defaultValues: {
        new_password: '',
        confirm_password: '',
      },
    });

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    data.email = email;
    try {
      const result = await resetPassword(data);
      if (result?.error) {
        if ('data' in (result?.error || {})) {
          let errMsg = (
            result.error as FetchBaseQueryError & {data: {detail?: string}}
          ).data?.detail;
          setError('new_password', {
            type: 'manual',
            message: errMsg,
          });
        }
        return;
      }
      if (result?.data) {
        reset();
        navigation.navigate('ResetSuccessful');
      }
    } catch (err: unknown) {
    }
  };
  return (
    <View className="">
      <Text className="font-DMSerRegular mb-3 text-textColor text-xl font-normal text-center">
        {'Create Password'}
      </Text>
      <Text className="font-SF mb-1 text-sndTextColor text-[13px] font-normal text-center">
        {'Craft a strong and secure password to safeguard your online presence'}
      </Text>
      <View className="py-3">
        <InputTextField
          name="new_password"
          placeholder="********"
          label={'New Password'}
          className=""
          control={control}
          rules={{
            required: 'New Password is required',
            minLength: {
              value: 8,
              message: 'New Password must be at least 8 characters',
            },
          }}
          type="password"
        />
        <InputTextField
          name="confirm_password"
          placeholder="********"
          label={'Confirm Password'}
          className=""
          control={control}
          rules={{
            required: 'Confirm Password is required',
            minLength: {
              value: 8,
              message: 'Confirm Password must be at least 8 characters',
            },
            validate: (value: string) =>
              value === getValues('new_password') || 'Passwords do not match',
          }}
          type="password"
        />

        <PrimaryButton
          title={'Confirm'}
          className={'w-full rounded-xl overflow-hidden mt-1'}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default ResetPasswordForm;
