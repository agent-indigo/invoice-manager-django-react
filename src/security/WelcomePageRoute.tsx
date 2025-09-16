import {
  FunctionComponent,
  ReactElement,
  useEffect
} from 'react'
import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const WelcomePageRoute: FunctionComponent = (): ReactElement => {
  const {
    user,
    token,
    setUser
  }: ContextProps = useGetContext()
  useEffect((): void => {(async (): Promise<void> => {
    const response: Response = await fetch('/api/auth/user')
    response.ok && setUser(await response.json())
  })()})
  return user && token !== '' ? (
    <Navigate
      to='/home'
      replace
    />
  ) : (
    <Outlet/>
  )
}
export default WelcomePageRoute