import {apiSlice} from '../api/apiSlice';

export const conversationSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.query({
      query: params => ({
        url: '/chat/conversations/',
        method: 'GET',
        params,
      }),
      providesTags: ['Conversation'],
    }),
    getSingleConversations: builder.query({
      query: params => ({
        url: `/chat/conversations/${params?.conversation_id}/`,
        method: 'GET',
        params,
      }),
      providesTags: ['Conversation'],
    }),
    generateConversation: builder.mutation({
      query: body => ({
        url: '/chat/save-question-answers/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Conversation'],
    }),
    updateSessionConversation: builder.mutation({
      query: ({conversation_id, title}) => ({
        url: `/chat/conversations/${conversation_id}/`,
        method: 'PUT',
        body: {title},
      }),
      invalidatesTags: ['Conversation'],
    }),
    deleteSessionConversation: builder.mutation({
      query: ({conversation_id}) => ({
        url: `/chat/conversations/${conversation_id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversation'],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useUpdateSessionConversationMutation,
  useDeleteSessionConversationMutation,
  useGenerateConversationMutation,
  useLazyGetSingleConversationsQuery,
} = conversationSlice;
