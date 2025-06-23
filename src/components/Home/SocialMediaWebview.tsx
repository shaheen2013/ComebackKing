import {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import WebView from 'react-native-webview';
import Entypo from 'react-native-vector-icons/Entypo';

interface SocialMediaWebviewProps {
  closeWebview: () => void;
  currentUrl: string;
  handleWebViewNavigation: (navState: any) => void;
  handleWebViewRequest: (request: any) => boolean;
}

const SocialMediaWebview = ({
  closeWebview,
  currentUrl,
  handleWebViewNavigation,
  handleWebViewRequest,
}: SocialMediaWebviewProps) => {
  const webViewRef = useRef<WebView>(null);
  return (
    <View className="flex-1 mt-4 mx-4 border-borderColor border rounded-lg bg-bgColor">
      <View className="p-2 flex-row justify-between items-center bg-primary rounded-t-lg">
        <Text className="text-white text-sm mr-3 w-[90%]" numberOfLines={1}>
          {currentUrl}
        </Text>
        <TouchableOpacity onPress={closeWebview} className="p-1">
          <Entypo name="cross" size={20} color="white" className="" />
        </TouchableOpacity>
      </View>
      <WebView
        ref={webViewRef}
        source={{uri: currentUrl}}
        className="flex-1 rounded-b-lg"
        onNavigationStateChange={handleWebViewNavigation}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={handleWebViewRequest}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        userAgent="Mozilla/5.0 (Linux; Android 10; Mobile; rv:91.0) Gecko/91.0 Firefox/91.0"
        // onError={(syntheticEvent) => {
        //     const { nativeEvent } = syntheticEvent;
        //     console.error('WebView error:', nativeEvent);
        // }}
        // onHttpError={(syntheticEvent) => {
        //     const { nativeEvent } = syntheticEvent;
        //     console.error('HTTP error:', nativeEvent.statusCode, nativeEvent.url);
        // }}
      />
    </View>
  );
};

export default SocialMediaWebview;
