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
const StaffRoute: FunctionComponent = (): ReactElement => {
  const {user}: ContextProps = useGetContext()
  !user?.is_staff && toast.error('You are not logged in as an administrator.')
  return user?.is_staff ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/'
      replace
    />
  )
}
export default StaffRoute