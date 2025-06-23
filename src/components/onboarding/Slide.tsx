import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import DiplomatIconSmall from '../../../assets/svg/DiplomatIconSmall';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OutlineRoundedButton from '../buttons/OutlineRoundedButton';
import PrimaryButton from '../buttons/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavProp} from '../../types/navigationType';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

interface SlideItem {
  id: number;
  title1: string;
  title2?: string;
  title3?: string;
  title4?: string;
}

const Slide = ({item}: {item: SlideItem}) => {
  const navigation = useNavigation<RootStackNavProp<'Home'>>();

  const handleFinish = async () => {
    try {
      await AsyncStorage.setItem('hasOnboarded', 'true');
      //   navigation.replace('Main');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white" style={{width, height}}>
      {item?.id !== 3 ? (
        <>
          <View className="flex-row justify-center my-6">
            <DiplomatIconSmall />
          </View>
          <Text className="text-textColor text-[28px] font-DMSerRegular font-normal text-center mx-4">
            {item.title1}
            {item.title2 && (
              <Text className="text-blueColor">{item?.title2}</Text>
            )}
            {item.title3 && <Text className="">{item?.title3}</Text>}
            {item.title4 && (
              <Text className="text-blueColor">{item?.title4}</Text>
            )}
          </Text>

          <View className="flex-1 -mt-[78px]">
            <ImageBackground
              source={
                item.id === 1
                  ? require('../../../assets/images/screen1.png')
                  : require('../../../assets/images/screen2.png')
              }
              className="flex-1  mx-[56px]"
              resizeMode="contain"
            />

            <LinearGradient
              colors={['rgba(239, 239, 239, 0.3)', 'rgba(255, 255, 255, 1)']}
              locations={[0.47, 1]} // Adjusted locations for -47.59% offset
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={s.gradientBackground}>
              {/* Your content here */}
            </LinearGradient>
          </View>
        </>
      ) : (
        <>
          <ImageBackground
            source={require('../../../assets/images/circle.png')}
            className=""
            resizeMode="cover"
            style={s.imageStyle}
          />
          <Text className="text-textColor text-[28px] font-DMSerRegular font-normal text-center mx-4 mt-4">
            {item.title1}
            {item.title2 && (
              <Text className="text-blueColor">{item?.title2}</Text>
            )}
          </Text>
          <View className="mt-5 mx-4">
            <PrimaryButton
              title={'Sign Up'}
              className={''}
              onPress={() => {
                handleFinish();
                navigation.replace('Register');
              }}
            />
            <OutlineRoundedButton
              title={'Skip'}
              className={'w-full rounded-xl overflow-hidden mt-4'}
              onPress={() => {
                handleFinish();
                navigation.replace('Drawer', {screen: 'Home'});
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Slide;

const s = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '60%',
    height: 98,
  },
  imageStyle: {
    height: 465,
    width: '100%',
  },
});
