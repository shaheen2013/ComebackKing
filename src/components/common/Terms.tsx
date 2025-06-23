import React from 'react';
import {Text, View} from 'react-native';
import TextButton from '../buttons/TextButton';

const TermsAndPrivacyText = () => {
  return (
    <View className="flex-row flex-wrap justify-center mx-[44px] mt-2">
      <Text className="font-SF text-[11px] text-lightGray font-normal">
        By continuing, you agree to{' '}
      </Text>
      <TextButton
        title={'Terms of Service'}
        onPress={() => {}}
        className="text-[11px] font-SF font-normal text-center"
        btnTextColor="text-textColor"
      />

      <Text className="text-[11px] font-SF font-normal text-center text-lightGray ">
        {' '}
        and have read our{' '}
      </Text>
      <TextButton
        title={'Privacy Policy'}
        onPress={() => {}}
        className="text-[11px] font-SF font-normal text-center"
        btnTextColor="text-textColor"
      />

      <Text className="font-SF text-[11px] text-lightGray font-normal">.</Text>
    </View>
  );
};

export default TermsAndPrivacyText;
