import {FlatList, Platform, SafeAreaView, View} from 'react-native';
import ProfileCard from '../../components/Profile/ProfileCard';
import {listingData, listingData2} from '../../types/profileType';
import ProfileItem from '../../components/Profile/ProfileItem';
import {FC, useRef} from 'react';
import Header from '../../components/common/Header';
import BottomSheet, {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ChangePasswordBottomSheet from '../../components/Profile/ChangePasswordBottomSheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AccountSettingsScreen: FC = () => {
  const changePasswordBottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  const handleOpenChangePassword = () => {
    changePasswordBottomSheetRef.current?.expand();
    changePasswordBottomSheetRef.current?.snapToIndex(3);
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
        <Header title={'Account'} />
        <ProfileCard />
        <View className="bg-bgColor m-4 rounded-2xl py-1">
          {
            <FlatList
              data={listingData}
              renderItem={({item, index}) => (
                <ProfileItem
                  item={item}
                  index={index}
                  itemLength={listingData?.length}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          }
        </View>

        <View className="bg-bgColor m-4 rounded-2xl py-1">
          {
            <FlatList
              data={listingData2}
              renderItem={({item, index}) => (
                <ProfileItem
                  item={item}
                  index={index}
                  itemLength={listingData2?.length}
                  onPress={() => {
                    if (item.icon === 'change_password') {
                      handleOpenChangePassword();
                    }
                  }}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          }
        </View>
        <ChangePasswordBottomSheet ref={changePasswordBottomSheetRef} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default AccountSettingsScreen;
