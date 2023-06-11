import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiURL = "https://whale-app-qsx89.ondigitalocean.app";
//const apiURL = "http://localhost:4000";

export const resumeVmAPI = createApi({
  reducerPath: "resumeVmAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  endpoints: (builder) => ({
    createResume: builder.mutation({
      query: (formData) => ({
        url: '/vmclass/create-resume',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
});

export const { useCreateResumeMutation } = resumeVmAPI;

export default resumeVmAPI;
