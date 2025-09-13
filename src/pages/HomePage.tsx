import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
import {
  Button,
  Card
} from 'react-bootstrap'
import {
  FaFileInvoiceDollar,
  FaKey,
  FaUserPlus
} from 'react-icons/fa'
import {Helmet} from 'react-helmet'
import ContextProps from '@/types/ContextProps'
import {useGetContext} from '../components/ContextProvider'
const HomePage: FunctionComponent = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate()
  const {user}: ContextProps = useGetContext()
  return (
    <>
      <Helmet>
        <title>
          Home | Invoices
        </title>
      </Helmet>
      <Card
        bg='light'
        className='p-auto'
      >
        {user ? (
          <Button
            type='button'
            variant='primary'
            className='p-auto text-white'
            onClick={(): void => navigate('/invoices')}
          >
            <FaFileInvoiceDollar/> Invoices
          </Button>
        ) : (
          <>
            <Button
              type='button'
              variant='primary'
              className='p-auto text-white'
              onClick={(): void => navigate('/login')}
            >
              <FaKey/> Log In
            </Button>
            <Button
              type='button'
              variant='primary'
              className='p-auto text-white'
              onClick={(): void => navigate('/register')}
            >
              <FaUserPlus/> Register
            </Button>
          </>
        )}
      </Card>
    </>
  )
}
export default HomePage