/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  Text,
  // TouchableOpacity,
  View,
} from 'react-native';
import DrawerAuthFooter from './DrawerAuthFooter';
import SearchComponent from './SearchComponent';
import {useGetConversationsQuery} from '../../features/conversation/conversationSlice';
import {dateStringToDateTitle} from '../../utils/commonFunction';
import {useCallback, useEffect, useState} from 'react';
import {ConversationSessionsItemType} from '../../types/conversationType';
import SessionListItem from './SessionListItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../features/store';
import {useDebounce} from '../../hooks/useDebounce';
import {refreshConversationSession} from '../../features/conversation/conversationState';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {v4 as uuidv4} from 'uuid';

type SessionListingProps = {
  closeDrawer: () => void;
};

const SessionListing = ({closeDrawer}: SessionListingProps) => {
  const {refreshKey} = useSelector((state: RootState) => state.conversation);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<
    ConversationSessionsItemType[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const dispatch = useDispatch();
  const {
    data: conversations,
    isLoading,
    isFetching,
    refetch,
  } = useGetConversationsQuery({
    page: page,
    size: 10,
    query: debouncedSearchTerm,
  });

  const resetSearch = () => {
    setSearchTerm('');
  };

  // Append new sections when data arrives
  useEffect(() => {
    if (conversations) {
      if (page === 1) {
        setSessionData(conversations.items ?? []);
      } else {
        setSessionData(prev => [...prev, ...(conversations.items ?? [])]);
      }
    }
  }, [conversations]);

  const loadMore = () => {
    if (!isLoading && conversations?.pages > page) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    dispatch(refreshConversationSession(Math.random()));
    setPage(1); // Reset pagination when search changes
  }, [debouncedSearchTerm]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  useEffect(() => {
    if (refreshKey !== null) {
      handleRefresh();
    }
  }, [refreshKey, handleRefresh]);

  return (
    conversations?.items && (
      <View className="flex-1 flex-col justify-between">
        <View className="flex-1 mx-2">
          <SearchComponent
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            resetSearch={resetSearch}
          />
          <SectionList
            stickySectionHeadersEnabled={false}
            contentContainerClassName="pb-4"
            onEndReached={loadMore}
            onEndReachedThreshold={0.6}
            sections={sessionData}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            keyExtractor={_ => uuidv4().toString()}
            renderItem={({item}) => {
              return <SessionListItem item={item} closeDrawer={closeDrawer} />;
            }}
            renderSectionHeader={({section: item}) => {
              return (
                <Text className="pb-1 font-SF text-[13px] font-normal text-sndTextColor mx-3 w-full bg-white">
                  {dateStringToDateTitle(item?.title)}
                </Text>
              );
            }}
            renderSectionFooter={() => {
              return <View className="border-b border-lightBorder mt-2 mb-4" />;
            }}
            ListEmptyComponent={
              !isFetching && !isLoading && debouncedSearchTerm !== '' ? (
                <View className="flex-1 items-center justify-center mt-8">
                  <Icon name="search-off" size={40} color="#8C97AB" />
                  <Text className="text-lightGray text-[20px] font-DMSerRegular">
                    No results found
                  </Text>
                </View>
              ) : null
            }
            ListFooterComponent={
              isFetching && !refreshing ? (
                <ActivityIndicator size="small" className="my-4" />
              ) : null
            }
          />
        </View>
        <DrawerAuthFooter />
      </View>
    )
  );
};

export default SessionListing;
