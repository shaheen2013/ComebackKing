import {
  Alert,
  // GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {profileItemType} from '../../types/profileType';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {cn} from '../../common/cn';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailSvg from '../../../assets/svg/Email';
import PaymentSvg from '../../../assets/svg/Payment';
import VideoPlaySvg from '../../../assets/svg/VideoPlay';
import LogOutSvg from '../../../assets/svg/LogOut';
import ChangePasswordSvg from '../../../assets/svg/ChangePassword';
import {deleteToken} from '../../utils/TokenManagement';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../../features/auth/authState';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavProp} from '../../types/navigationType';

const renderIcon = ({icon}: {icon: string}) => {
  switch (icon) {
    case 'settings':
      return <Ionicons name="settings-outline" size={20} color={'#0F274F'} />;
    case 'email':
      return <EmailSvg />;
    case 'video_play':
      return <VideoPlaySvg />;
    case 'payment':
      return <PaymentSvg />;
    case 'change_password':
      return <ChangePasswordSvg />;
    case 'log_out':
      return <LogOutSvg />;
    default:
      return null;
  }
};

const ProfileItem = ({
  item,
  index,
  itemLength,
  onPress,
}: {
  item: profileItemType;
  index: number;
  itemLength: number;
  onPress?: () => void;
}) => {
  const navigation = useNavigation<RootStackNavProp<'Home'>>();
  const dispatch = useDispatch();
  const logOut = async () => {
    await deleteToken();
    dispatch(setAuthentication(false));
    navigation.navigate('Home');
  };

  const handlePress = () => {
    if (item?.label === 'Log Out') {
      Alert.alert(
        'Are Your Sure?',
        'You’ll be signed out from this account.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: logOut,
          },
        ],
        {cancelable: true},
      );
    } else if (onPress) {
      onPress();
    }
    // You can handle other items here if needed
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={cn(
        'p-3 flex flex-row justify-between',
        index !== itemLength - 1 && 'border-b border-borderColor',
      )}>
      <View className="flex flex-row gap-x-2">
        {renderIcon({icon: item.icon})}
        <Text className="text-[15px] leading-5 text-textColor">
          {item.label}
        </Text>
      </View>
      <FontAwesome
        name="angle-right"
        size={20}
        color={'#0F274F'}
        className="text-textColor"
      />
    </TouchableOpacity>
  );
};

export default ProfileItem;
