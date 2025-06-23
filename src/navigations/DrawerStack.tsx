import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {DrawerParamList} from '../types/navigationType';
import HomeScreen from '../screens/main/HomeScreen';
import CustomDrawerNavigation from './CustomDrawerNavigation';
import ProfileStack from './ProfileStack';
import BottomSheet, {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ConversationSessionBottomSheet from '../components/drawer/ConversationSessionBottomSheet';
import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {setConversationSessionRef} from '../features/conversation/conversationState';

const Drawer = createDrawerNavigator<DrawerParamList>();

const renderDrawerContent = (props: DrawerContentComponentProps) => (
  <CustomDrawerNavigation {...props} />
);

const DrawerStack: React.FC = () => {
  const editConversationSessionBottomSheetRef = useRef<BottomSheet | null>(
    null,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (editConversationSessionBottomSheetRef.current) {
      dispatch(
        setConversationSessionRef(
          editConversationSessionBottomSheetRef.current,
        ),
      );
    }
  }, [dispatch]);
  return (
    <BottomSheetModalProvider>
      <Drawer.Navigator
        drawerContent={renderDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            width: '80%',
          },
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="ProfileStack" component={ProfileStack} />
      </Drawer.Navigator>
      <ConversationSessionBottomSheet
        ref={editConversationSessionBottomSheetRef}
      />
    </BottomSheetModalProvider>
  );
};

export default DrawerStack;
