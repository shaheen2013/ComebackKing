import {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DiplomatIcon from '../../../assets/svg/DiplomatIcon';
import {cn} from '../../common/cn';
import SocialIcon from 'react-native-vector-icons/FontAwesome';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../../types/navigationType';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {socialMediaData, SocialMediaItem} from '../../types/socialMedia';
import SocialAccountsModal from '../modals/SocialAccountsModal';

interface HomeHeaderProps {
  selectedSocial: SocialMediaItem;
  setSelectedSocial: (social: SocialMediaItem) => void;
  // socialAccountListModal: boolean;
  // setSocialAccountListModal: (value: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const HomeHeader: FC<HomeHeaderProps> = ({
  selectedSocial,
  setSelectedSocial,
  activeTab,
  setActiveTab,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const [socialAccountListModal, setSocialAccountListModal] = useState(false);
  return (
    <>
      <View className="flex-row justify-between items-center gap-x-2 mx-4">
        <TouchableOpacity
          className="p-3 rounded-[10px] bg-lightBlue"
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <SimpleLineIcons name={'menu'} size={22} className="text-textColor" />
        </TouchableOpacity>
        <View className="flex-1 flex-row gap-x-2 rounded-lg">
          <TouchableOpacity
            className={cn(
              'h-12 flex-1 flex-row justify-center items-center gap-x-1 rounded-lg',
              activeTab === 'diplomat' ? 'bg-active' : 'bg-bgLight',
            )}
            onPress={() => {
              setActiveTab('diplomat');
            }}>
            <DiplomatIcon
              width={17}
              height={17}
              color={activeTab === 'diplomat' ? '#ffffff' : '#0F274F'}
            />
            <Text
              className={cn(
                'font-normal text-[15px] font-SF text-textColor',
                activeTab === 'diplomat' ? 'text-white' : 'text-textColor',
              )}>
              Comeback King
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={cn(
              'h-12 flex-1 flex-row justify-center items-center rounded-lg gap-2',
              activeTab === 'social' ? 'bg-primary' : 'bg-bgLight',
            )}
            onPress={() => {
              setActiveTab('social');
              // setWebViewVisible(true)
            }}>
            <SocialIcon
              name={selectedSocial.icon}
              size={16}
              color={activeTab === 'social' ? '#ffffff' : selectedSocial.color}
            />
            <Text
              className={cn(
                'text-textColor font-normal text-[15px] font-SF',
                activeTab === 'social' ? 'text-white' : 'text-textColor',
              )}>
              {selectedSocial?.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSocialAccountListModal(true);
              }}
              className="py-2">
              <Entypo
                name="chevron-thin-down"
                size={20}
                color={activeTab === 'social' ? '#ffffff' : '#0F274F'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <SocialAccountsModal
        isVisible={socialAccountListModal}
        onClose={() => setSocialAccountListModal(false)}
        socialMedia={socialMediaData}
        setSelectedSocial={setSelectedSocial}
        selectedItem={selectedSocial}
      />
    </>
  );
};

export default HomeHeader;
