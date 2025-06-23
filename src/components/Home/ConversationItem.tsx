import {
  Alert,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Logo from '../../../assets/svg/Logo';
import Clipboard from '@react-native-clipboard/clipboard';
import {messageType} from '../../types/model';
import SoundSvg from '../../../assets/svg/Sound';
import {useDispatch, useSelector} from 'react-redux';
import {setDislikeConversation} from '../../features/conversation/conversationState';
import {RootState} from '../../features/store';

// type ConversationItemProps = {}

type ConversationItemProps = {
  item: messageType;
  copiedItem: string | number | null;
  setCopiedItem: (id: string | number | null) => void;
};

const ConversationItem = ({
  item,
  copiedItem,
  setCopiedItem,
}: ConversationItemProps) => {
  const dispatch = useDispatch();
  const {disLikeConversationId} = useSelector(
    (state: RootState) => state.conversation,
  );
  const handleCopy = (text: string, id: string | number) => {
    if (copiedItem === id) {
      setCopiedItem(null); // uncopy if same item tapped again
    } else {
      Clipboard.setString(text);
      Alert.alert('Copied AI Reply', text);
      setCopiedItem(id);
    }
  };

  const handleDislike = (msgItem: messageType) => {
    dispatch(setDislikeConversation(msgItem));
  };
  return (
    <TouchableOpacity
      className="my-4"
      key={item?.id}
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {item?.chat_answers && item?.id === 'one' && (
        <View className="pb-[10px] flex flex-row w-[80%] justify-start gap-x-2">
          {Platform.OS === 'ios' ? (
            <Logo />
          ) : (
            <Image
              source={require('../../../assets/images/logo_36_32.png')}
              width={36}
              height={32}
              className="rounded-full"
            />
          )}
          <Text className="text-[17px] font-SF font-normal text-textColor mt-[6px]">
            {item?.chat_answers?.[0]?.answer}
          </Text>
        </View>
      )}
      {item?.question && (
        <View className="py-[10px] px-[24px] flex flex-row w-[80%] justify-start gap-x-2 bg-bgLight rounded-[10px] self-end mb-3">
          <Text className="text-[17px] font-SF font-normal text-textColor">
            {item?.question}
          </Text>
        </View>
      )}
      {(item?.chat_answers?.length ?? 0) > 0 && item?.id !== 'one' && (
        <View className="">
          <View className="flex flex-row justify-start gap-x-2">
            <Logo />
            <Text className="text-[17px] font-SF font-normal text-textColor leading-7  flex-shrink mt-3">
              {item?.chat_answers && item?.chat_answers[0]?.answer}
            </Text>
          </View>
          <View className="self-end flex flex-row items-center gap-x-3 mr-4 mt-[6px]">
            <TouchableOpacity
              onPress={() => {
                if (item?.chat_answers && item?.id) {
                  handleCopy(item?.chat_answers[0]?.answer, item?.id);
                }
              }}>
              <AntDesign
                name={item?.id === copiedItem ? 'like1' : 'like2'}
                size={16}
                color={'#0F274F'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDislike(item);
              }}>
              <AntDesign
                name={
                  item?.id === disLikeConversationId ? 'dislike1' : 'dislike2'
                }
                size={16}
                color={'#0F274F'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SoundSvg />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default ConversationItem;
