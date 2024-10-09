import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../proxxy/proxxy';

export const mentorsApi = createApi({
  reducerPath: 'mentorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  endpoints: (builder) => ({
    getMentors: builder.query({
      query: () => 'mentors',
    }),
  }),
});