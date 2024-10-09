import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../proxxy/proxxy';

export const appointmentsApi = createApi({
    reducerPath: 'appointmentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['appointments'],
    endpoints: (builder) => ({
        getAppointmentsForUser: builder.query({
            query: (userId) => `appointments-for-one-user/${userId}`,
            providesTags: ['appointments'],
        }),
       createAppointment: builder.mutation({
           query: ( appointmentPayload )=>({
               url:'create-appointment',
               method:'POST',
               body: appointmentPayload               
        }),
        invalidatesTags: ['appointments'],
       }), 
       cancelAppointment: builder.mutation({
              query: (appointmentId) => ({
                url: `cancel-appointment/${appointmentId}`,
                method: 'PUT',
              }),
              invalidatesTags: ['appointments'],
         }),
    }),
})