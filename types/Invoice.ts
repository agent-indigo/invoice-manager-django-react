export default interface Invoice {
  id: string
  vendor: string
  subtotal: string
  hst: string
  total: string
  invoice_id: string
  date: string
  user_id: number
  created_at: Date
  updated_at: Date
}