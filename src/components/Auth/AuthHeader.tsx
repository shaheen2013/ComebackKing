import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '../../types/navigationType';
import {useNavigation} from '@react-navigation/native';

type AuthHeaderProps = {
  title: string;
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;
const AuthHeader: FC<AuthHeaderProps> = ({title}) => {
  const navigation = useNavigation<NavProp>();
  return (
    <View className="p-4 flex flex-row gap-x-4 items-start">
      <TouchableOpacity
        className="p-2"
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            // optional fallback: navigate to a safe screen
            navigation.navigate('Login');
          }
        }}>
        <AntDesign name="arrowleft" size={16} />
      </TouchableOpacity>

      <Text className="font-DMSerRegular flex-1 text-textColor  font-normal text-[22px] leading-[28px]">
        {title}
      </Text>
    </View>
  );
};

export default AuthHeader;
