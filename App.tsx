/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import { GestureHandlerRootView } from "react-native-gesture-handler";
import './global.css';
import 'react-native-url-polyfill/auto';
import React, {useEffect, useState} from 'react';
import MainStack from './src/navigations/MainStack';
import {View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import SplashScreen from './src/screens/splash/SplashScreen';
import {Provider} from 'react-redux';
import store from './src/features/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';


function App(): React.JSX.Element {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Hide the NATIVE splash screen first
    RNBootSplash.hide({fade: true});
    // Simulate app initialization (e.g., load fonts, data)
    setTimeout(() => {
      setIsAppReady(true); // Hide CUSTOM splash after data loads
    }, 300);
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <View className="flex-1">
          {!isAppReady ? <SplashScreen /> : <MainStack />}
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
