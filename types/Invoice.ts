export default interface Invoice {
  id: string
  vendor: string
  subtotal: number
  hst: number
  total: number
  invoice_id: string
  date: Date
  user_id: number
  created_at: Date
  updated_at: Date
}