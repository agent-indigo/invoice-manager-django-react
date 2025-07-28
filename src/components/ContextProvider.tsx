import {
  Context,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react'
import ContextProps from '@/types/ContextProps'
const AppContext: Context<ContextProps> = createContext<ContextProps>({})
const ContextProvider: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}
export const useGetContext: Function = (): ContextProps => useContext<ContextProps>(AppContext)
export default ContextProvider