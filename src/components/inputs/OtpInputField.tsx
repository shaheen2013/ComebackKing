import {useController, Control, FieldValues, FieldPath} from 'react-hook-form';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {cn} from '../../common/cn';
import {useRef, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

type OtpInputFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: object;
};

const OtpInputField = <T extends FieldValues>({
  name,
  control,
  rules,
}: OtpInputFieldProps<T>) => {
  const hiddenInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController({
    name,
    control,
    rules,
  });

  const handlePaste = async () => {
    try {
      const text = await Clipboard.getString();
      const cleanedText = text.replace(/[^0-9]/g, '').slice(0, 4);
      if (cleanedText.length === 4) {
        onChange(cleanedText);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to paste OTP');
    }
  };

  const digits = value?.split('') || [];
  const paddedDigits = [...digits, ...Array(4).fill('')].slice(0, 4);
  const currentPosition = Math.min(digits.length, 3);

  return (
    <View className="mb-3">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => hiddenInputRef.current?.focus()}
        onLongPress={handlePaste}
        className="flex-row justify-center gap-3">
        {paddedDigits.map((digit, index) => (
          <View
            key={index}
            className={cn(
              'w-10 h-10 border-2 rounded-lg items-center justify-center',
              error
                ? 'border-red-500'
                : digit
                ? 'border-otpBorderColor'
                : 'border-grayBorderColor',
            )}>
            <Text className="font-SF text-[12px] font-medium">{digit}</Text>
            {isFocused && index === currentPosition && !digit && (
              <View className="h-6 w-[2px] bg-otpBorderColor absolute right-1/2 top-1/2 -translate-y-3 animate-pulse" />
            )}
          </View>
        ))}
        <TextInput
          ref={hiddenInputRef}
          value={value}
          onChangeText={text => onChange(text.replace(/[^0-9]/g, ''))}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onFocus={() => setIsFocused(true)}
          maxLength={4}
          keyboardType="number-pad"
          className="absolute opacity-0 w-full h-full"
          contextMenuHidden={true} // Hide default context menu
        />
      </TouchableOpacity>
      {error && (
        <Text className="text-red-500 text-sm font-medium mt-1 ml-1 text-center">
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default OtpInputField;
