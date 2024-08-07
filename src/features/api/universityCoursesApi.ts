import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../proxxy/proxxy';


export const universityCoursesApi = createApi({
    reducerPath: 'universityCoursesApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: [],
    endpoints: (builder) => ({
        getCoursesByUniversity: builder.query({
            query: (Institution: string) => `university-course/${Institution}`,
        }),   
    }),
    });