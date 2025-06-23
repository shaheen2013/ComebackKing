import {FC, ReactNode} from 'react';
import {
  Platform,
  // KeyboardAvoidingView,
  // Platform,
  SafeAreaView,
  // ScrollView,
  StyleSheet,
} from 'react-native';
// import {cn} from '../../common/cn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  classes?: string;
  contentContainerClassName?: string;
};

const KeyboardAvoidingContainer: FC<Props> = ({
  children,
  // classes = '',
  // contentContainerClassName = '',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={[
        Platform.OS === 'android' && {
          paddingTop: insets.top,
          // paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <KeyboardAwareScrollView
        style={s.scrollView}
        contentContainerStyle={s.container}
        enableOnAndroid
        extraHeight={100}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;

const s = StyleSheet.create({
  container: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  scrollView: {
    flex: 1, // Ensure the ScrollView takes full height
  },
});
