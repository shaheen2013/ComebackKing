import {forwardRef} from 'react';
import {EmitterSubscription, Keyboard, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetComponent from '../common/BottomSheetComponent';
import InputTextField from '../inputs/InputTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../buttons/PrimaryButton';
import {useChangePasswordMutation} from '../../features/profile/profileSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {Alert} from 'react-native';

export type Ref = BottomSheet;

interface FormInputs {
  new_password: string;
  confirm_password: string;
  old_password: string;
}

interface Props {}

const ChangePasswordBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const [changePassword, {isLoading}] = useChangePasswordMutation();

  const {handleSubmit, control, getValues, setError, reset} =
    useForm<FormInputs>({
      mode: 'onTouched',
      defaultValues: {
        //   name: profile?.name || '',
      },
    });

  const onSubmit = async (data: FormInputs) => {
    try {
      const result = await changePassword(data);
      if (result?.error) {
        if ('data' in (result?.error || {})) {
          let errMsg = (
            result.error as FetchBaseQueryError & {data: {detail?: string}}
          ).data?.detail;
          setError('old_password', {
            type: 'manual',
            message:
              errMsg !== 'Validation error'
                ? errMsg
                : 'New Password should be different from the Old Password',
          });
        }
        return;
      }
      if (result?.data) {
        if (ref && 'current' in ref && ref.current) {
          ref.current?.close();
        }
        Keyboard.dismiss();
        reset();
        Alert.alert(result?.data?.detail);
      }
    } catch (err: unknown) {
      // Alert.alert(err?.data?.message);
    }
  };

  let keyboardDidShowListener: EmitterSubscription | null = null;
  const onChangeBottomSheet = (value: number) => {
    if (value > 0 && !keyboardDidShowListener) {
      keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        (ref as React.RefObject<BottomSheet>)?.current?.snapToIndex(6);
      });
    }

    if (keyboardDidShowListener && value < 0) {
      keyboardDidShowListener.remove();
      keyboardDidShowListener = null;
    }
  };

  return (
    <BottomSheetComponent
      title="Update your Password"
      ref={ref}
      onChangeBottomSheet={onChangeBottomSheet}>
      <View className="mt-4 flex flex-col justify-between">
        <InputTextField
          name="old_password"
          placeholder="********"
          label={'Old Password'}
          className=""
          control={control}
          rules={{
            required: 'Old Password is required',
            minLength: {
              value: 8,
              message: 'Old Password must be at least 8 characters',
            },
          }}
          type="password"
        />
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
      </View>
      <PrimaryButton
        title="Confirm"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </BottomSheetComponent>
  );
});

export default ChangePasswordBottomSheet;
