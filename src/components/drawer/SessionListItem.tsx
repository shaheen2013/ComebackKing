import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ConversationSingleSessionItem} from '../../types/conversationType';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../features/store';
import {setSelectedSessionConverstion} from '../../features/conversation/conversationState';

interface SessionListItemProps {
  item: ConversationSingleSessionItem;
  closeDrawer?: () => void;
}

const SessionListItem = ({item, closeDrawer}: SessionListItemProps) => {
  const conversation = useSelector((state: RootState) => state.conversation);

  const dispatch = useDispatch();
  const handleConversationSessionEdit = () => {
    conversation?.refValue?.expand();
    conversation?.refValue?.snapToIndex(2);
  };
  return (
    <View className="mb-2 flex flex-row w-[94%] justify-between mx-3">
      <TouchableOpacity
        className=""
        onPress={() => {
          dispatch(setSelectedSessionConverstion(item));
          if (closeDrawer) {
            closeDrawer();
          }
        }}>
        <Text className="font-SF text-[15px] font-normal leading-5 text-textColor">
          {item?.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(setSelectedSessionConverstion(item));
          handleConversationSessionEdit();
        }}>
        <Feather name="more-vertical" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default SessionListItem;
