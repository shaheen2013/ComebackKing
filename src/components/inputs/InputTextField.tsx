import {FieldValues, useController, Control, FieldPath} from 'react-hook-form';
import {cn} from '../../common/cn';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import EyeSvg from '../../../assets/svg/Eye';
import EyeOffSvg from '../../../assets/svg/EyeOff';

type InputTextFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  control: Control<T>;
  rules?: object;
  placeholder: string;
  type?: string;
  className?: string;

};

const InputTextField = <T extends FieldValues>({
  name,
  label = '',
  placeholder = '',
  control,
  rules,
  type = 'text',
  className = '',

}: InputTextFieldProps<T>) => {
  const [showText, setShowText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController<T>({
    name,
    control,
    rules,
  });
  return (
    <View className="mb-3">
      {label && <Text className={'text-[12px] font-SF font-bold mb-2 text-textColor'}>{label}</Text>}
      <View
        className={cn(
          'bg-white rounded-lg py-[10px] px-4 relative text-textColor border border-borderColor',
          {
            'border-error': error,
            'border-active': !error && isFocused,
            'border-borderColor': !error && !isFocused,
          },
          className,
        )}>
        <TextInput
          className={cn('')}
          onBlur={() => {
            onBlur();
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7D8AA0'}
          autoCapitalize={type === 'email' ? 'none' : 'words'}
          secureTextEntry={type === 'password' && !showText ? true : false}
          autoComplete={type === 'email' ? 'email' : 'off'}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
        />

        {type === 'password' && (
          <View className="absolute right-3 flex top-0 bottom-0 justify-center">
            <TouchableOpacity
              onPress={() => {
                type === 'password' ? setShowText(!showText) : null;
              }}>
              {showText ? <EyeOffSvg /> : <EyeSvg />}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {error && (
        <Text className="text-error text-sm font-SF font-medium mt-1 ml-1">
          {error?.message as string}
        </Text>
      )}
    </View>
  );
};

export default InputTextField;
