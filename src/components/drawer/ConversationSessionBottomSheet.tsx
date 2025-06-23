import {forwardRef, useEffect, useState} from 'react';
import {
  EmitterSubscription,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheetComponent from '../common/BottomSheetComponent';
import InputTextField from '../inputs/InputTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../buttons/PrimaryButton';
import {RootState} from '../../features/store';
import {Alert} from 'react-native';
import {
  useDeleteSessionConversationMutation,
  useUpdateSessionConversationMutation,
} from '../../features/conversation/conversationSlice';
import {refreshConversationSession} from '../../features/conversation/conversationState';

export type Ref = BottomSheet;

interface FormInputs {
  title: string;
}

interface Props {}

const ConversationSessionBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const {sessionConversation} = useSelector(
    (state: RootState) => state.conversation,
  );
  const dispatch = useDispatch();
  const [updateSession, {isLoading}] = useUpdateSessionConversationMutation({});
  const [deleteSession, {isLoading: isDeleteLoading}] =
    useDeleteSessionConversationMutation();
  const [editTitle, setEditTitle] = useState<boolean>(false);

  const {handleSubmit, control, reset} = useForm<FormInputs>({
    mode: 'onTouched',
    defaultValues: {
      title: sessionConversation?.title || '',
    },
  });

  useEffect(() => {
    if (sessionConversation?.title) {
      reset({title: sessionConversation.title});
    }
  }, [sessionConversation?.title, reset]);

  const onSubmit = async (data: FormInputs) => {
    let updatedData = {
      title: data?.title,
      conversation_id: sessionConversation?.id,
    };
    try {
      const response = await updateSession(updatedData);
      if (response) {
        if (ref && 'current' in ref && ref.current) {
          ref.current?.close();
        }
        dispatch(refreshConversationSession(Math.random()));
        Keyboard.dismiss();
      }
    } catch (err: unknown) {
    }
  };

  let keyboardDidShowListener: EmitterSubscription | null = null;
  const onChangeBottomSheet = (value: number) => {
    if (value > 0 && !keyboardDidShowListener) {
      keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        (ref as React.RefObject<BottomSheet>)?.current?.snapToIndex(4);
      });
    }

    if (keyboardDidShowListener && value < 0) {
      keyboardDidShowListener.remove();
      keyboardDidShowListener = null;
    }
  };
  const handleSessionConversationLabel = () => {
    setEditTitle(pre => !pre);
  };

  const deleteSessionConversation = async () => {
    try {
      const response = await deleteSession({
        conversation_id: sessionConversation?.id,
      });
      if (response) {
        if (response) {
          if (ref && 'current' in ref && ref.current) {
            ref.current?.close();
          }
          dispatch(refreshConversationSession(Math.random()));
          Keyboard.dismiss();
        }
      }
    } catch (err: unknown) {
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      'Are You Sure?',
      'Deleted session cannot be recovered.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel', // Makes it look like a native cancel button
        },
        {
          text: 'Delete',
          onPress: () => deleteSessionConversation(),
          style: 'destructive', // iOS: red text, Android: normal
        },
      ],
      {cancelable: true}, // Tap outside to cancel (Android)
    );
  };

  return (
    <BottomSheetComponent
      title=""
      ref={ref}
      onChangeBottomSheet={onChangeBottomSheet}>
      <View className="mt-4 flex flex-col justify-between">
        <View className="flex flex-row mb-2 pl-1 justify-between items-center mr-1">
          <TouchableOpacity
            onPress={() => handleSessionConversationLabel()}
            className="">
            <Text className="text-base font-SF font-normal text-textColor">
              Edit Session
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSessionConversationLabel}
            className="">
            <AntDesign size={16} name="edit" color={'#0F274F'} />
          </TouchableOpacity>
        </View>
        {editTitle ? (
          <InputTextField
            name="title"
            label=""
            control={control}
            rules={{
              required: 'Session title is required',
            }}
            placeholder="Enter your session title"
          />
        ) : (
          <></>
        )}
        <View className="flex flex-row mb-2 pl-1 justify-between items-center mr-1">
          <TouchableOpacity onPress={showDeleteAlert} className="">
            <Text className="text-base font-SF font-normal text-textColor">
              Delete Session
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="" onPress={showDeleteAlert}>
            <MaterialIcons
              size={16}
              name="delete-outline"
              color={'#0F274F'}
              className="self-end"
            />
          </TouchableOpacity>
        </View>
      </View>
      <PrimaryButton
        title="Update"
        onPress={handleSubmit(onSubmit)}
        disabled={!editTitle}
        loading={isLoading}
      />
    </BottomSheetComponent>
  );
});

export default ConversationSessionBottomSheet;
