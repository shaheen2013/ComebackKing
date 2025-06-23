// import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ComponentType} from 'react';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamList = {
  App: undefined;
};

export type ProfileStackParamList = {
  AccountSettings: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  ProfileStack: {screen: keyof ProfileStackParamList};
};

export type RootStackParamList = {
  Login: undefined;
  Splash: undefined;
  Home: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  OTP: {email: string; expires_in: number};
  ResetPassword: {email: string};
  ResetSuccessful: undefined;
  Onboarding: undefined;
  Drawer: {screen: keyof DrawerParamList};
};

// export interface RouteType<Key extends keyof RootStackParamList> {
//   name: Key;
//   component: ComponentType<NativeStackScreenProps<RootStackParamList, Key>>;
// }

export interface RouteType<Key extends keyof RootStackParamList> {
  name: Key;
  component: ComponentType<any>; // Allow more flexibility for component props
}

export type RootStackNavProp<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;
