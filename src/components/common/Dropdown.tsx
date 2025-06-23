import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

interface DropdownProps {
  data: string[];
  value?: string;
  onSelect: (selectedItem: string, index: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  value,
  onSelect,
  placeholder = '',
  disabled = false,
}) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      disabled={disabled}
      defaultValue={value}
      defaultValueByIndex={value ? data.indexOf(value) : undefined}
      dropdownStyle={s.dropdown}
      renderButton={(selectedItem, isOpened) => (
        <View className="bg-bgColor px-3 border border-borderColor h-12 w-32 rounded-lg flex flex-row justify-between items-center">
          <Text className="font-SF font-normal text-[15px] text-textColor">
            {selectedItem ?? placeholder}
          </Text>
          <Entypo
            name={isOpened ? 'chevron-thin-up' : 'chevron-thin-down'}
            size={16}
            color="#0F274F"
            className="ml-1"
          />
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <TouchableOpacity
          key={index}
          className={`py-3 px-2 flex flex-row justify-between ${
            isSelected ? 'bg-lightBlue' : 'bg-white'
          }`}>
          <Text className="font-SF text-[15px] text-textColor">{item}</Text>
          {isSelected && <Octicons name="check" size={16} color="#0F274F" />}
        </TouchableOpacity>
      )}
    />
  );
};

export default Dropdown;

const s = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});
