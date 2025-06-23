import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/main/ProfileScreen';
import AccountSettingsScreen from '../screens/main/AccountSettingsScreen';
import {ProfileStackParamList} from '../types/navigationType';

const Stack = createNativeStackNavigator<ProfileStackParamList>();
const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
