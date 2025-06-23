import {messageType} from '../../types/model';
import {
  BottomSheetRef,
  ConversationSingleSessionItem,
} from './../../types/conversationType';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
  refValue: BottomSheetRef | null;
  sessionConversation: ConversationSingleSessionItem | null;
  refreshKey: number | null;
  disLikeConversation: messageType | null;
  disLikeConversationId: string | number;
}

const initialState: InitialState = {
  refValue: null,
  sessionConversation: null,
  refreshKey: null,
  disLikeConversation: null,
  disLikeConversationId: '',
};
const ConversationStateSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationSessionRef(state, action: PayloadAction<any>) {
      state.refValue = action.payload;
    },
    setSelectedSessionConverstion(
      state,
      action: PayloadAction<ConversationSingleSessionItem | null>,
    ) {
      state.sessionConversation = action.payload;
    },
    refreshConversationSession(state, action: PayloadAction<any>) {
      state.refreshKey = action.payload;
    },
    setDislikeConversation(state, action: PayloadAction<any>) {
      state.disLikeConversation = action.payload;
    },
    clearDislikeConversation: state => {
      state.disLikeConversation = null;
    },
    setDislikeConversationId(state, action: PayloadAction<string | number>) {
      state.disLikeConversationId = action.payload;
    },
  },
});
export const {
  setConversationSessionRef,
  setSelectedSessionConverstion,
  refreshConversationSession,
  setDislikeConversation,
  clearDislikeConversation,
  setDislikeConversationId,
} = ConversationStateSlice.actions;

export default ConversationStateSlice.reducer;
