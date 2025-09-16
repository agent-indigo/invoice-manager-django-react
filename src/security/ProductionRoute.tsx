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
const ProductionRoute: FunctionComponent = (): ReactElement => {
  const {
    configStatus,
    setConfigStatus
  }: ContextProps = useGetContext()
  const [
    errorOccurred,
    setErrorOccurred
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
      setErrorOccurred(true)
      setErrorMessage(await response.text())
    }
  })()})
  return errorOccurred ? (
    <Card
      bg='danger'
      className='p-auto'
    >
      <h1>
        Configuration Status Verification Error
      </h1>
      <p>
        {errorMessage}
      </p>
    </Card>
  ) : configStatus.rootExists ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/setup/createSuperuser'
      replace
    />
  )
}
export default ProductionRoute