
export type modelItem = {
  id: number;
  label: string;
};

export const roles: string[] = ['Colleague', 'Friend', 'Family'];

export const models: modelItem[] = [
  {id: 1, label: 'Diplomat'},
  {id: 2, label: 'Sarcastic'},
  {id: 3, label: 'Savage'},
];

export type answerType = {
  id?: number | string;
  answer: string;
  extra_data?: unknown;
  created_at?: string;
  updated_at?: string;
  feedback_status?: boolean;
};

export type messageType = {
  id: number | string;
  question?: string;
  created_at?: string;
  updated_at?: string;
  chat_answers?: answerType[];
};

export type PayloadType = {
  question: string;
  answers: answerType[];
  conversation_id?: string;
};

export const initalChat: messageType[] = [
  {
    id: 'one',
    chat_answers: [
      {
        id: 'answer',
        answer: 'Hello! How can I assist you today?',
      },
    ],
  },
];

export const MODEL_NAME = 'Diplomat.gguf';
