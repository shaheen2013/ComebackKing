import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  // FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../utils/globalVariable';
import {getToken, logoutUser} from '../../utils/TokenManagement';

const customBaseQuery = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async headers => {
      const token = await getToken();
      headers.set('Authorization', token ? `Bearer ${token}` : 'null');
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error) {
    const status = result.error.status;

    if (Number(status) >= 400) {
      // Logout the user on 404 error
      logoutUser(); // Defined in the next step
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Profile', 'Conversation'],
  endpoints: _builder => ({}),
});
