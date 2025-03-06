import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { modelApiDomain } from '../../proxxy/proxxy';

export const modelApi = createApi({
    reducerPath: 'modelApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: modelApiDomain,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json'); // Example of setting content type
            return headers;
        }
    }),
    tagTypes: [],
    endpoints: (builder) => ({
        courseRecommend : builder.mutation({
            query: (modelPayload) => ({
                url: '',
                method: 'POST',
                body: JSON.stringify(modelPayload),
            }),
        }),       
    }),
});
