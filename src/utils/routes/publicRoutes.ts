// import DrawerStack from '../../navigations/DrawerStack';
import DrawerStack from '../../navigations/DrawerStack';
import ForgetPasswordScreen from '../../screens/auth/ForgetPasswordScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import OTPScreen from '../../screens/auth/OTPScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import ResetPasswordScreen from '../../screens/auth/ResetPasswordScreen';
import ResetSuccessfulScreen from '../../screens/auth/ResetSuccessfulScreen';
import OnboardingScreen from '../../screens/onboarding/OnboardingScreen';
import { RootStackParamList, RouteType } from '../../types/navigationType';

export const publicRoutes: RouteType<keyof RootStackParamList>[] = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Register',
    component: RegisterScreen,
  },
  {
    name: 'ForgetPassword',
    component: ForgetPasswordScreen,
  },
  {
    name: 'OTP',
    component: OTPScreen,
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
  },
  {
    name: 'ResetSuccessful',
    component: ResetSuccessfulScreen,
  },
  {
    name: 'Drawer',
    component: DrawerStack,
  },
  {
    name: 'Onboarding',
    component: OnboardingScreen,
  },
];
