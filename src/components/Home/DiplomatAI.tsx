/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Star from '../../../assets/svg/Star';
import ModelItem from './ModelItem';

import Dropdown from '../common/Dropdown';
import ConversationItem from './ConversationItem';
import {messageType, modelItem, models, roles} from '../../types/model';
// import RNFS from 'react-native-fs';
// import {deleteFile} from '../../utils/file';
// import CircularProgress from '../common/CircularProgress';
import * as Progress from 'react-native-progress';

type DiplomatAIProps = {
  isModelReady: boolean;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  resetConversation: () => void;
  activeModel: modelItem;
  setActiveModel: (model: modelItem) => void;
  inputText: string;
  setInputText: (role: string) => void;
  handleSend: () => void;
  loading: boolean;
  setLoading?: (loading: boolean) => void;
  messages: messageType[];
  setMessages: (messages: messageType[]) => void;
  copiedItem: string | number | null;
  setCopiedItem: (item: string | number | null) => void;
  progress: number; // Add progress prop for download status
};

// const MODEL_NAME = 'Diplomat.gguf';

const DiplomatAI: FC<DiplomatAIProps> = ({
  isModelReady,
  selectedRole,
  setSelectedRole,
  resetConversation,
  activeModel,
  setActiveModel,
  inputText,
  setInputText,
  handleSend,
  loading,
  messages,
  copiedItem,
  setCopiedItem,
  progress,
  // setMessages,
  // setLoading,
}) => {
  const flatListRef = useRef<FlatList<any>>(null);
  // const modelPath = `${RNFS.DocumentDirectoryPath}/${MODEL_NAME}`;

  useEffect(() => {
    if (!loading && messages.length > 0) {
      // Small timeout to ensure new content is rendered
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [messages, loading]);

  return (
    <View className="relative flex-1 my-5 justify-between">
      {/* Header Chat */}
      <View className="flex flex-row justify-between items-center mx-4 bg-white pb-3">
        <Dropdown
          data={roles}
          value={selectedRole}
          onSelect={item => setSelectedRole(item)}
        />

        {/* <TouchableOpacity
          onPress={() => {
            deleteFile(modelPath);
          }}>
          <Text>Delete</Text>
        </TouchableOpacity> */}

        {!isModelReady && messages[0]?.id !== 'one' && (
          <View className="flex flex-row justify-center items-center gap-x-2">
            <Progress.Pie progress={progress / 100} size={20} />
            <Text>{`${progress}%`}</Text>
          </View>
        )}
        <TouchableOpacity
          className="bg-lightBlue px-3 border border-blueBorder h-12 rounded-lg flex flex-row justify-center items-center gap-x-2"
          onPress={resetConversation}>
          <Star />
          <Text className="font-SF text-[15px] font-normal text-active">
            {'New Chat'}
          </Text>
        </TouchableOpacity>
      </View>
      {!isModelReady && messages?.length < 2 && messages[0].id === 'one' && (
        <View className="absolute top-[30%] left-[35%]">
          <Text className="text-2xl font-DMSerRegular w-full text-textColor text-center pr-6 mb-2">
            AI Model
          </Text>
          <Progress.Circle progress={progress / 100} size={120} showsText />
          <Text className="text-2xl font-DMSerRegular my-2 w-full text-textColor text-center">
            Downloading...
          </Text>
        </View>
      )}
      <FlatList
        ref={flatListRef}
        // showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-8"
        keyboardShouldPersistTaps="handled"
        data={messages}
        keyExtractor={item => item?.id.toString()}
        scrollEnabled={true}
        onContentSizeChange={() => {
          if (!loading) {
            flatListRef.current?.scrollToEnd({animated: true});
          }
        }}
        onLayout={() => {
          if (!loading) {
            flatListRef.current?.scrollToEnd({animated: true});
          }
        }}
        renderItem={({item}) => {
          return (
            <ConversationItem
              item={item}
              copiedItem={copiedItem}
              setCopiedItem={setCopiedItem}
            />
          );
        }}
      />
      <View>
        <View className="flex justify-between  border-t border-grayBorderColor p-4">
          {/* {!isModelReady && (
            <View className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <View
                className="bg-blue-500 h-full"
                style={{width: `${progress}%`}}
              />
            </View>
          )} */}
          <View className="bg-bgLight px-4 py-[10px] rounded-xl flex flex-row justify-between w-full">
            <TextInput
              multiline
              value={inputText}
              onChangeText={setInputText}
              className="h-[54px] text-[17px] font-SF font-normal w-[85%] text-textColor"
            />
            <View className="flex flex-col justify-center">
              <TouchableOpacity
                onPress={handleSend}
                className="bg-active p-4 rounded-lg"
                disabled={!isModelReady || loading}>
                {!loading ? (
                  <MaterialCommunityIcons
                    name="send-outline"
                    size={16}
                    color={'white'}
                    className="text-white"
                  />
                ) : (
                  <ActivityIndicator size={16} color={'white'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          contentContainerClassName="mx-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          data={models}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => (
            <ModelItem
              item={item}
              activeModel={activeModel}
              setActiveModel={setActiveModel}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DiplomatAI;
