import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationType';
import {publicRoutes} from '../utils/routes/publicRoutes';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/splash/SplashScreen';
import { navigationRef } from './RootNavigation';
// import {authRoutes} from '../utils/routes/authRoutes';
// import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('hasOnboarded');
        setHasOnboarded(value === 'true');
      } catch (error) {
        console.error('Error checking onboarding:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={!hasOnboarded ? 'Onboarding' : 'Drawer'}
        screenOptions={{
          headerShown: false,
        }}>
        {/* {mainRoutes?.map((route, key) => {
          const {name, component} = route;
          return <Stack.Screen key={key} name={name} component={component} />;
        })} */}
        {publicRoutes?.map((route, key) => {
          const {name, component} = route;
          return <Stack.Screen key={key} name={name} component={component} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
