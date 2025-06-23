import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchComponent = ({
  onSearch,
  searchTerm,
  resetSearch,
}: {
  onSearch: (value: string) => void;
  searchTerm: string;
  resetSearch: () => void;
}) => {
  return (
    <View className="w-full bg-lightBlue rounded-full h-[44px] my-4 flex flex-col justify-center px-3">
      <View className="flex flex-row gap-x-2 items-center">
        <Icon name="search" size={20} className="text-textColor" color={''} />
        <View className="flex flex-row justify-between w-[92%]">
          <TextInput
            placeholder="Search"
            value={searchTerm}
            onChangeText={onSearch}
            className="font-SF text-[16px] font-normal text-textColorgffg w-[90%]"
          />
          {searchTerm && (
            <AntDesign
              name="close"
              size={20}
              color={'#465977'}
              className="text-borderColor"
              onPress={resetSearch}
            />
          )}
        </View>
      </View>
    </View>
  );
};
export default SearchComponent;
