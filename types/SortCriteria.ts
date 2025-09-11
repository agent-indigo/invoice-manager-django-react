import Invoice from '@/types/Invoice'
export default interface SortCriteria {
  field: keyof Invoice
  order: 'asc' | 'desc'
}