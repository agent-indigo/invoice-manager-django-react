import {
  Context,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'
import {toast} from 'react-toastify'
import ContextProps from '@/types/ContextProps'
import User from '@/types/User'
import Invoice from '@/types/Invoice'
import ConfigStatus from '@/types/ConfigStatus'
const AppContext: Context<ContextProps> = createContext<ContextProps>({
  setUser: (): void => {},
  setToken: (): void => {},
  users: [],
  setUsers: (): void => {},
  invoices: [],
  setInvoices: (): void => {},
  configStatus: {
    rootExists: false
  },
  setConfigStatus: (): void => {}
})
const ContextProvider: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => {
  const [
    user,
    setUser
  ] = useState<User | undefined>(undefined)
  const [
    users,
    setUsers
  ] = useState<User[]>([])
  const [
    invoices,
    setInvoices
  ] = useState<Invoice[]>([])
  const [
    configStatus,
    setConfigStatus
  ] = useState<ConfigStatus>({
    rootExists: false
  })
  const [
    token,
    setToken
  ] = useState<string | undefined>(undefined)
  useEffect((): void => {(async (): Promise<void> => {
    const response: Response = await fetch('/api/config/status')
    response.ok ? setConfigStatus(await response.json()) : toast.error(await response.text())
  })()}, [])
  return (
    <AppContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      users,
      setUsers,
      invoices,
      setInvoices,
      configStatus,
      setConfigStatus
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGetContext: Function = (): ContextProps => useContext<ContextProps>(AppContext)
export default ContextProvider