/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import {socialMediaData, SocialMediaItem} from '../../types/socialMedia';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebViewNavigation} from 'react-native-webview';
import HomeHeader from '../../components/Home/HomeHeader';
import {isSameDomain} from '../../utils/commonFunction';
import SocialMediaWebview from '../../components/Home/SocialMediaWebview';
import DiplomatAI from '../../components/Home/DiplomatAI';
import {useDownloadModel} from '../../hooks/useDownloadModel';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../features/store';
import {
  initalChat,
  // MODEL_NAME,
  modelItem,
  messageType,
} from '../../types/model';
import {initLlama, loadLlamaModelInfo} from 'llama.rn';
import {
  useGenerateConversationMutation,
  useLazyGetSingleConversationsQuery,
} from '../../features/conversation/conversationSlice';
import {
  clearDislikeConversation,
  refreshConversationSession,
  setDislikeConversationId,
  setSelectedSessionConverstion,
} from '../../features/conversation/conversationState';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const isKeyboardVisible = useKeyboardStatus();
  const [generateConversation, {}] = useGenerateConversationMutation();
  const [trigger, {data: conversationDetials}] =
    useLazyGetSingleConversationsQuery();
  const {isModelReady, progress, modelPath} = useDownloadModel();
  const dispatch = useDispatch();
  const {profile} = useSelector((state: RootState) => state.profile);
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const {sessionConversation, disLikeConversation} = useSelector(
    (state: RootState) => state.conversation,
  );
  const [coversationId, setCoversationId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('diplomat');
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [selectedSocial, setSelectedSocial] = useState<SocialMediaItem>(
    socialMediaData[0],
  );
  const [inputText, setInputText] = useState('');
  const [selectedRole, setSelectedRole] = useState('Colleague');
  const [messages, setMessages] = useState<messageType[]>(initalChat);
  const [activeModel, setActiveModel] = useState<modelItem>({
    id: 1,
    label: 'Diplomat',
  });
  const [llamaContext, setLlamaContext] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | number | null>(null);

  // Load last valid URL on mount
  useEffect(() => {
    const loadLastUrl = async () => {
      try {
        const savedUrl = await AsyncStorage.getItem(
          `lastUrl-${selectedSocial.id}`,
        );

        // Verify if saved URL still matches domain
        if (savedUrl && isSameDomain(savedUrl, selectedSocial)) {
          setCurrentUrl(savedUrl);
        } else {
          setCurrentUrl(selectedSocial.url);
        }
      } catch (error) {
        setCurrentUrl(selectedSocial.url);
      }
    };
    loadLastUrl();
  }, [selectedSocial]);

  // Save URL only if domain matches
  const persistUrl = async (url: string) => {
    if (!isSameDomain(url, selectedSocial) || url.includes('l.facebook')) {
      return;
    }

    try {
      await AsyncStorage.setItem(`lastUrl-${selectedSocial.id}`, url);
    } catch (error) {
      console.error('Error saving URL:', error);
    }
  };

  const handleWebViewNavigation = (navState: any) => {
    const newUrl = navState.url;
    // Always update current URL for display

    // Auto-save only if domain matches
    if (isSameDomain(newUrl, selectedSocial)) {
      persistUrl(newUrl);
      setCurrentUrl(newUrl);
    } else {
      setCurrentUrl(selectedSocial?.url);
    }
  };

  const closeWebview = () => {
    setWebViewVisible(false);
    setActiveTab('diplomat');
  };

  const handleWebViewRequest = (request: WebViewNavigation) => {
    const url = request.url;
    const sameDomain = isSameDomain(url, selectedSocial);

    // console.log('Navigation to:', url);
    // console.log('Domain match:', sameDomain);
    // if (
    //   selectedSocial.name === 'Linkedin' ||
    //   selectedSocial.name === 'Instagram'
    // ) {
    //   return true;
    // }

    if (!sameDomain) {
      // console.log('here .......', url);
      if (!url.includes('fbsbx.com') && !url.includes('accounts.google.com')) {
        Linking.openURL(url).catch(
          err => console.log(err, 'errr..'),
          // Alert.alert('Open Failed', err.message)
        );
      }
      // setCurrentUrl(selectedSocial.url)
      return false;
    }
    setCurrentUrl(url); // Update for display
    return true;
  };

  useEffect(() => {
    if (activeTab === 'social') {
      setWebViewVisible(true);
      if (
        currentUrl.includes('l.facebook.com') &&
        selectedSocial.name === 'Facebook'
      ) {
        setCurrentUrl(selectedSocial.url);
      }
    } else {
      setWebViewVisible(false);
    }
  }, [activeTab]);

  useEffect(() => {
    const checkModel = async () => {
      const context = await initLlama({
        model: modelPath,
        use_mlock: true,
        n_ctx: 2048,
        // n_gpu_layers: 0, // number of layers to store in VRAM (Currently only for iOS)
        //  embedding: true, // use embedding
      });
      setLlamaContext(context);
    };
    isModelReady && checkModel();
  }, [isModelReady]);

  const handleSend = async (customQuestion: string = '') => {
    const askedQuestion = inputText || customQuestion;
    if (!llamaContext || askedQuestion.trim() === '') {
      return;
    }

    const questionId = uuidv4();
    let newQuestion: any = {
      id: questionId,
      question: askedQuestion,
      chat_answers: [], // Start with empty answers
    };

    setMessages(pre => {
      return [...pre, newQuestion];
    });

    try {
      setLoading(true);
      const stopWords = [
        '</s>',
        '<|end|>',
        '<|eot_id|>',
        '<|end_of_text|>',
        '<|im_end|>',
        '<|EOT|>',
        '<|END_OF_TURN_TOKEN|>',
        '<|end_of_turn|>',
        '<|endoftext|>',
      ];

      let promptMsg = `
        Context:
        You are a witty social media response specialist who excels at crafting assertive comebacks using irony and sarcasm. Your task is to help users respond to uncomfortable or challenging social media interactions with clever, dignified responses that maintain boundaries while showcasing wit.
        Input:
        - A social media exchange containing one or more messages where someone has put the user in an uncomfortable position
        Detailed Instructions:
        1. Analyze the ${activeModel?.label} tone, subtext, and social dynamics for ${selectedRole} of the provided conversation.
        2. Generate one response that:
          - Use irony and/or sarcasm effectively as a defensive strategy
          - Maintain the user's dignity and social standing
          - Set appropriate boundaries without excessive aggression
          - Appear clever and composed rather than reactive
          - Feel authentic to social media communication
        3. Ensure each response:
          - Is proportional to the original comment (not excessively harsh for minor slights)
          - Would be understandable in the context of the platform
          - Has a different approach or tone between Response A and Response B
          - Contains just enough wit to deflect the awkwardness while making a point
        Do not include explanations, introductions, or commentary - provide only the  response exactly as they should be posted on social media.
        The input of message is: ${askedQuestion}`;

      const msgResult = await llamaContext.completion({
        prompt: promptMsg,
        systemPrompt:
          'You are a witty social media response specialist who excels at crafting assertive comebacks using irony and sarcasm. Your task is to help users respond to uncomfortable or challenging social media interactions with clever, dignified responses that maintain boundaries while showcasing wit.',
        n_predict: 100,
        stop: [...stopWords],
        temperature: 0.8,
      });

      let answers = [
        {
          answer: msgResult?.content,
        },
      ];

      let payloadAnswers = [
        {
          predict: msgResult?.content,
        },
      ];

      newQuestion = {
        chat_answers: answers,
      };

      // Update the specific question with the answer
      setMessages(prev =>
        prev.map(msg =>
          msg.id === questionId ? {...msg, chat_answers: answers} : msg,
        ),
      );

      // setMessages(pre => {
      //   return [...pre, newQuestion];
      // });

      setInputText('');
      if (profile?.id) {
        let payload: any = {
          question: askedQuestion,
          answers: payloadAnswers,
        };
        if (coversationId) {
          payload.conversation_id = coversationId;
        }
        try {
          const response = await generateConversation(payload).unwrap();
          if (response?.conversation_id) {
            setCoversationId(response?.conversation_id);
            dispatch(refreshConversationSession(Math.random()));
          }
        } catch (err) {
          console.error('Error:', err);
        }
      }

      // setLoading(false);
    } catch (error) {
      console.error('Error during message handling:', error);
      // setLoading(false);
    } finally {
      setLoading(false);
      dispatch(clearDislikeConversation());
    }
  };

  const resetConversation = () => {
    setMessages(initalChat);
    setInputText('');
    setActiveModel({id: 1, label: 'Diplomat'});
    setSelectedRole('Colleague');
    setLoading(false);
    setCoversationId(null);
    dispatch(setSelectedSessionConverstion(null));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      resetConversation();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (sessionConversation) {
      setCoversationId(sessionConversation?.id);
      trigger({conversation_id: sessionConversation?.id, page: 1, size: 100});
      if (conversationDetials) {
        setMessages(conversationDetials?.items ?? []);
      }
    }
  }, [sessionConversation, conversationDetials]);

  useEffect(() => {
    if (disLikeConversation?.question) {
      handleSend(disLikeConversation?.question);
      dispatch(setDislikeConversationId(disLikeConversation?.id));
      dispatch(clearDislikeConversation());
    }
  }, [disLikeConversation]);

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={[
        Platform.OS === 'android' && {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          paddingLeft: insets.left,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // 'height' or 'padding' for Android
        keyboardVerticalOffset={
          Platform.OS === 'android' && isKeyboardVisible ? -100 : 0
        }
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="pt-3 flex-1">
            {/* Header Section */}
            <HomeHeader
              selectedSocial={selectedSocial}
              setSelectedSocial={setSelectedSocial}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {webViewVisible && (
              <SocialMediaWebview
                closeWebview={closeWebview}
                currentUrl={currentUrl}
                handleWebViewNavigation={handleWebViewNavigation}
                handleWebViewRequest={handleWebViewRequest}
              />
            )}
            {/* Original Content (Shown when WebView is closed) */}
            {!webViewVisible && (
              <DiplomatAI
                isModelReady={isModelReady}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                activeModel={activeModel}
                setActiveModel={setActiveModel}
                resetConversation={resetConversation}
                messages={messages}
                setMessages={setMessages}
                inputText={inputText}
                setInputText={setInputText}
                handleSend={handleSend}
                loading={loading}
                setLoading={setLoading}
                copiedItem={copiedItem}
                setCopiedItem={setCopiedItem}
                progress={progress}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
