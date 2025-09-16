import {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState
} from 'react'
import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Card} from 'react-bootstrap'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const StaffRoute: FunctionComponent = (): ReactElement => {
  const {
    user,
    token,
    setUser
  }: ContextProps = useGetContext()
  const [
    errorOccured,
    setErrorOccured
  ] = useState<boolean>(false)
  const [
    errorMessage,
    setErrorMessage
  ] = useState<string>('')
  useEffect((): void => {(async (): Promise<void> => {
    const response: Response = await fetch(
      '/api/auth/user', {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    if (response.ok) {
      setUser(await response.json())
    } else {
      setErrorOccured(true)
      setErrorMessage(await response.text())
    }
  })()})
  !user?.is_staff && toast.error('You are not logged in as an administrator.')
  return errorOccured ? (
    <Card
      bg='danger'
      className='p-auto'
    >
      <h1>
        User Authorization Verification Error
      </h1>
      <p>
        {errorMessage}
      </p>
    </Card>
  ) : user?.is_staff && token !== '' ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/'
      replace
    />
  )
}
export default StaffRoute