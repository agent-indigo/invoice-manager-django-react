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
    const getConfigStatus: Function = async (): Promise<void> => {
      const response: Response = await fetch('/api/config/status')
      if (response.ok) {
        setConfigStatus(await response.json())
      } else {
        toast.error(await response.text())
      }
    }
    const getUser: Function = async (): Promise<void> => {
      const response: Response = await fetch('/api/auth/user')
      if (response.ok) {
        setUser(await response.json())
      } else {
        setUser(undefined)
      }
    }
    const getInvoices: Function = async (): Promise<void> => {
      const response: Response = await fetch('/api/invoices')
      if (response.ok) {
        setInvoices(await response.json())
      } else {
        toast.error(await response.text())
      }
    }
    await getConfigStatus()
    configStatus.rootExists && await getUser()
    user && token && token !== '' && await getInvoices()
  })()})
  return (
    <AppContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
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