export type ConversationSessionsType = {
  item: ConversationSessionsItemType[];
  page: number;
  pages: number;
  size: number;
  total: number;
};

export type ConversationSessionsItemType = {
  title: string;
  data: ConversationSingleSessionItem[];
};

export type ConversationSingleSessionItem = {
  id: number;
  title: string;
  user_id?: string;
  updated_date?: string;
  updated_at?: string;
  created_at?: string;
};

export type BottomSheetRef = {
  expand: () => void;
  snapToIndex: (index: number) => void;
};
