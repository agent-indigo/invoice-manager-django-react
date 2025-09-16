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
const PrivateRoute: FunctionComponent = (): ReactElement => {
  const {
    user,
    token,
    setUser
  }: ContextProps = useGetContext()
  useEffect((): void => {(async (): Promise<void> => {
    const response: Response = await fetch (
      '/api/auth/user', {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    response.ok && setUser(await response.json())
  })()})
  return user && token !== '' ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/welcome'
      replace
    />
  )
}
export default PrivateRoute