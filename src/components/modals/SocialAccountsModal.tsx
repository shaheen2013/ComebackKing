import {
    Modal,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SocialIcon from 'react-native-vector-icons/FontAwesome';
import { SocialMediaItem } from '../../types/socialMedia';


type Props = {
    isVisible: boolean;
    onClose: () => void;
    socialMedia: SocialMediaItem[];
    setSelectedSocial: any;
    selectedItem: SocialMediaItem | null;
};

const SocialMediaItemRow = ({
    item,
    isSelected,
    onPress,
}: {
    item: SocialMediaItem;
    isSelected: boolean;
    onPress: () => void;
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-row items-center justify-between border-b border-gray-300 py-3 px-2"
        >
            <View className="flex flex-row items-center gap-x-4">
                <SocialIcon name={item.icon} size={22} color={item.color} />
                <Text className="text-xl font-medium text-gray-800">{item.name}</Text>
            </View>

            {/* Radio circle */}
            <View
                className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-blue-500' : 'border-gray-400'
                    } items-center justify-center`}
            >
                {isSelected && <View className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
            </View>
        </TouchableOpacity>
    );
};

const SocialAccountsModal = ({
    isVisible,
    onClose,
    socialMedia,
    setSelectedSocial,
    selectedItem,
}: Props) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={false}>
            <SafeAreaView className="flex-1 bg-white">
                <View className="p-4">
                    {/* Header */}
                    <View className="flex flex-row items-center mb-4">
                        <TouchableOpacity onPress={onClose} className="p-2">
                            <Icon name="close" size={32} color="#333" />
                        </TouchableOpacity>
                        <Text className="text-xl font-semibold text-gray-900 ml-2">Social Account List</Text>
                    </View>

                    {/* Social List */}
                    <FlatList
                        data={socialMedia}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <SocialMediaItemRow
                                item={item}
                                isSelected={selectedItem?.id === item.id}
                                onPress={() => {
                                    setSelectedSocial(item);
                                    onClose()
                                }}
                            />
                        )}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default SocialAccountsModal;
