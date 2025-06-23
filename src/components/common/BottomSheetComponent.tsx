/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {forwardRef, ReactNode, useCallback, useMemo} from 'react';
import {
  //   Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  //   useWindowDimensions,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import CrossSvg from '../../../assets/svg/Close.svg';

export type Ref = BottomSheet;
interface Props {
  children: ReactNode;
  title: string;
  onChangeBottomSheet?: any;
  // backIcon?: true;
  // setIsEditSession?: any;
}

const BottomSheetComponent = forwardRef<Ref, Props>(
  ({children, title, onChangeBottomSheet}, ref) => {
    // const {height, width} = useWindowDimensions();

    const snapPoints = useMemo(
      () => ['30%', '40%', '50%', '70%', '80%', '94%'],
      [],
    );
    const handleClosePress = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.close();
      }
      Keyboard.dismiss();
    };

    const handleSheetChanges = useCallback((index: number) => {
      if (typeof onChangeBottomSheet === 'function') {
        onChangeBottomSheet(index);
      }
    }, []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          opacity={0.5}
          style={{backgroundColor: 'rgb(0,0,0,0.5)'}}
          {...props}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        onClose={() => handleClosePress()}
        // enableDynamicSizing
        keyboardBehavior={'extend'}>
        <KeyboardAvoidingView
          // style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // keyboardVerticalOffset={40}
          enabled>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              if (ref && 'current' in ref && ref.current) {
                if (title === 'Update your name') {
                  ref.current.snapToIndex(1);
                } else if (title === 'Update your Password') {
                  ref.current.snapToIndex(3);
                } else if (!title) {
                  ref.current.snapToIndex(2);
                }
              }
            }}>
            <BottomSheetView>
              <View className={'h-full px-4'}>
                <View className="flex-row justify-end items-center">
                  <TouchableOpacity onPress={() => handleClosePress()}>
                    <AntDesign name="close" size={24} color="#0F274F" />
                  </TouchableOpacity>
                </View>
                {title && (
                  <Text className="font-DMSerRegular text-[28px] leading-[34px] mt-3 self-start">
                    {title}
                  </Text>
                )}

                <ScrollView
                  className="h-full"
                  keyboardShouldPersistTaps="handled">
                  {children}
                </ScrollView>
              </View>
            </BottomSheetView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </BottomSheet>
    );
  },
);

export default BottomSheetComponent;
