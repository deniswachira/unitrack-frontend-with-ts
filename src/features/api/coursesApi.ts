import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../proxxy/proxxy';


export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: [],
    endpoints: (builder) => ({
        lawCluster : builder.mutation({
            query: (lawClusterPayload) => ({
                url: 'calculate/law-cluster',
                method: 'POST',
                body: lawClusterPayload,
            }),
        }),
        businessCluster : builder.mutation({
            query: (businessClusterPayload) => ({
                url: 'calculate/business-cluster',
                method: 'POST',
                body: businessClusterPayload,
            }),
        }),
        socialScienceCluster : builder.mutation({
            query: (socialScienceClusterPayload) => ({
                url: 'calculate/social-sci-cluster',
                method: 'POST',
                body: socialScienceClusterPayload,
            }),
        }),
        geoScienceCluster : builder.mutation({
            query: (geoScienceClusterPayload) => ({
                url: 'calculate/geoscience-cluster',
                method: 'POST',
                body: geoScienceClusterPayload,
            }),
        }),
    }),
    });