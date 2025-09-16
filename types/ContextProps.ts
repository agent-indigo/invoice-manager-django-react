import {
  Dispatch,
  SetStateAction
} from 'react'
import Invoice from '@/types/Invoice'
import User from '@/types/User'
import ConfigStatus from '@/types/ConfigStatus'
export default interface ContextProps {
  user?: User
  setUser: Dispatch<SetStateAction<User | undefined>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
  invoices: Invoice[]
  setInvoices: Dispatch<SetStateAction<Invoice[]>>
  configStatus: ConfigStatus
  setConfigStatus: Dispatch<SetStateAction<ConfigStatus>>
}