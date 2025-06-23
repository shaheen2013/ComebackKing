import {forwardRef} from 'react';
import {EmitterSubscription, Keyboard, View} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

import {useSelector} from 'react-redux';
import BottomSheetComponent from '../common/BottomSheetComponent';
import InputTextField from '../inputs/InputTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../buttons/PrimaryButton';
import {useUpdateProfileMutation} from '../../features/profile/profileSlice';
import {ProfileState} from '../../types/profileType';
import {RootState} from '../../features/store';

export type Ref = BottomSheet;

interface FormInputs {
  name: string;
}

interface Props {}

const ChangeNameBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const {profile}: ProfileState = useSelector(
    (state: RootState) => state.profile,
  );
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  const {handleSubmit, control} = useForm<FormInputs>({
    mode: 'onTouched',
    defaultValues: {
      name: profile?.name || '',
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    formData.append('name', data.name);
    try {
      const response = await updateProfile(formData).unwrap();
      if (response) {
        if (ref && 'current' in ref && ref.current) {
          ref.current?.close();
        }
        Keyboard.dismiss();
      }
    } catch (err: any) {
      // Alert.alert(err?.data?.message);
    }
  };

  let keyboardDidShowListener: EmitterSubscription | null = null;
  const onChangeBottomSheet = (value: number) => {
    if (value > 0 && !keyboardDidShowListener) {
      keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        (ref as React.RefObject<BottomSheet>)?.current?.snapToIndex(3);
      });
    }

    if (keyboardDidShowListener && value < 0) {
      keyboardDidShowListener.remove();
      keyboardDidShowListener = null;
    }
  };

  return (
    <BottomSheetComponent
      title="Update your name"
      ref={ref}
      onChangeBottomSheet={onChangeBottomSheet}>
      <View className="mt-4 flex flex-col justify-between">
        <InputTextField
          name="name"
          label=""
          control={control}
          rules={{
            required: 'Name is required',
          }}
          placeholder="Enter your name"
        />
      </View>
      <PrimaryButton
        title="Update"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </BottomSheetComponent>
  );
});

export default ChangeNameBottomSheet;
