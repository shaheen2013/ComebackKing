import {Image, ImageBackground, Platform, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DiplomatLogoIcon from '../../components/common/DiplomatLogoIcon';

const SplashScreen: React.FC = () => {
  return (
    <View className="flex-1">
      {Platform.OS === 'android' ? (
        <View className="flex-1 justify-center items-center">
          <Image
            source={require('../../../assets/images/logo_128_110.png')}
            width={128}
            height={110}
            className="rounded-full"
          />
        </View>
      ) : (
        <LinearGradient
          // colors={['#4A19A4', '#00EAFF']} // equivalent to --Primary-R75 to --Primary-R50
          colors={['#4A19A4', '#F0E9FD']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={s.container}>
          <ImageBackground
            source={require('../../../assets/images/bg.png')}
            className="flex-1 items-center justify-center"
            resizeMode="cover">
            <DiplomatLogoIcon />
          </ImageBackground>
        </LinearGradient>
      )}
    </View>
  );
};

export default SplashScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
