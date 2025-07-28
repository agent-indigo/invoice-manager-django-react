import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (
      headers, {
        getState
      }
    ) => {}
  }),
  tagTypes: [
    'invoice'
  ],
  endpoints: builder => ({})
})
export default apiSlice