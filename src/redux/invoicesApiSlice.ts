import apiSlice from './apiSlice'
import Data from '@/types/Data'
import Mutation from '@/types/Mutation'
const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInvoice: builder.query({
      query: (id: string) => ({
        url: `/invoices/${id}`,
        method: 'GET'
      }),
      providesTags: [
        'invoice'
      ]
    }),
    getInvoices: builder.query({
      query: () => ({
        url: '/invoices',
        method: 'GET'
      }),
      providesTags: [
        'invoice'
      ]
    }),
    addInvoice: builder.mutation({
      query: (body: Data) => ({
        url: '/invoices',
        method: 'POST',
        body
      }),
      invalidatesTags: [
        'invoice'
      ]
    }),
    editInvoice: builder.mutation({
      query: ({
        id,
        body
      }: Mutation) => ({
        url: `/invoices/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [
        'invoice'
      ]
    }),
    deleteInvoice: builder.mutation({
      query: (id: string) => ({
        url: `/invoices/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        'invoice'
      ]
    })
  })
})
export const {
  useGetInvoiceQuery,
  useLazyGetInvoiceQuery,
  useGetInvoicesQuery,
  useLazyGetInvoicesQuery,
  useAddInvoiceMutation,
  useEditInvoiceMutation,
  useDeleteInvoiceMutation
} = invoicesApiSlice