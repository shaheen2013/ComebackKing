/* eslint-disable react-hooks/exhaustive-deps */
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DrawerHeader from '../components/drawer/DrawerHeader';
import GuestComponent from '../components/drawer/GuestComponent';
import SessionListing from '../components/drawer/SessionListing';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../features/store';
import {getToken, logoutUser} from '../utils/TokenManagement';
import {setAuthentication} from '../features/auth/authState';
import {useLazyGetProfileQuery} from '../features/profile/profileSlice';
import {setProfile} from '../features/profile/profileState';

const CustomDrawerNavigation = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const [trigger, {data: userData, error}] = useLazyGetProfileQuery();
  useEffect(() => {
    const checkAuthtication = async () => {
      const token = await getToken();
      if (token) {
        dispatch(setAuthentication(true));
        trigger({});
      } else {
        dispatch(setAuthentication(false));
      }
    };
    checkAuthtication();
  }, []);
  useEffect(() => {
    if (userData) {
      dispatch(setProfile(userData));
    }
  }, [userData]);

  // Logout on profile fetch error
  useEffect(() => {
    if (error && 'status' in error && Number(error.status) >= 400) {
      logoutUser();
      dispatch(setAuthentication(false));
    }
  }, [error]);

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };

  return (
    <View
      {...props}
      className="flex-1 mb-2"
      style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <DrawerHeader onPress={() => props.navigation.closeDrawer()} />
      {isAuthenticated ? (
        <SessionListing closeDrawer={closeDrawer} />
      ) : (
        <GuestComponent />
      )}
    </View>
  );
};

export default CustomDrawerNavigation;
