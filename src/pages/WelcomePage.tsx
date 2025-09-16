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
  FaKey,
  FaUserPlus
} from 'react-icons/fa'
import {Helmet} from 'react-helmet'
const WelcomePage: FunctionComponent = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate()
  return (
    <>
      <Helmet>
        <title>
          Welcome | Invoices
        </title>
      </Helmet>
      <Card
        bg='light'
        className='p-auto'
      >
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
      </Card>
    </>
  )
}
export default WelcomePage