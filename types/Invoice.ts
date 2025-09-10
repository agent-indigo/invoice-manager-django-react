import Data from '@/types/Data'
export default interface Invoice extends Data {
  vendor: string
  subtotal: number
  hst: number
  total: number
  invoice_id: string
  date: Date
}