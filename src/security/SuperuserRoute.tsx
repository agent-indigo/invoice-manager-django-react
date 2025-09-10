import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const SuperuserRoute: FunctionComponent = (): ReactElement => {
  const {user}: ContextProps = useGetContext()
  !user?.is_superuser && toast.error('You are not logged in as the superuser.')
  return user?.is_superuser ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/'
      replace
    />
  )
}
export default SuperuserRoute