import {Alert, Platform, SafeAreaView} from 'react-native';
import {FC, useRef} from 'react';
import {View} from 'react-native';
import OutlineRoundedButton from '../../components/buttons/OutlineRoundedButton';
// import ProfileInfo from '../../components/Profile/ProfileInfo';
import Header from '../../components/common/Header';
import ProfileInfoCard from '../../components/Profile/ProfileInfoCard';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../utils/TokenManagement';
import {setAuthentication} from '../../features/auth/authState';
import {RootStackNavProp} from '../../types/navigationType';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ChangeNameBottomSheet from '../../components/Profile/ChangeNameBottomSheet';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProfileScreen: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavProp<'Home'>>();
  const changeNameBottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  const logOut = async () => {
    await deleteToken();
    dispatch(setAuthentication(false));
    navigation.navigate('Home');
  };

  const handlePress = () => {
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

    // You can handle other items here if needed
  };

  const handleOpenChangeName = () => {
    changeNameBottomSheetRef.current?.expand();
    changeNameBottomSheetRef.current?.snapToIndex(1);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        className="flex-1 bg-white"
        style={[
          Platform.OS === 'android' && {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingRight: insets.right,
            paddingLeft: insets.left,
          },
        ]}>
        <Header title={'Profile'} />
        <View className="flex-1 justify-between m-4">
          <View>
            <ProfileInfo handleOpenChangeName={handleOpenChangeName} />
            <ProfileInfoCard />
          </View>

          <OutlineRoundedButton title="Log out" onPress={handlePress} />
        </View>
        <ChangeNameBottomSheet ref={changeNameBottomSheetRef} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default ProfileScreen;
