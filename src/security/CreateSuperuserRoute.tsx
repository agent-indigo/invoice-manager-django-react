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
import {Card} from 'react-bootstrap'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const CreateSuperuserRoute: FunctionComponent = (): ReactElement => {
  const {
    configStatus,
    setConfigStatus
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
    const response: Response = await fetch('/api/config/status')
    if (response.ok) {
      setConfigStatus(await response.json())
    } else {
      setErrorOccured(true)
      setErrorMessage(await response.text())
    }
  })()})
  return errorOccured ? (
    <Card
      bg='danger'
      className='p-auto'
    >
      <h1>
        Superuser Existence Verification Error
      </h1>
      <p>
        {errorMessage}
      </p>
    </Card>
  ) : configStatus.rootExists ? (
    <Navigate
      to='/'
      replace
    />
  ) : (
    <Outlet/>
  )
}
export default CreateSuperuserRoute