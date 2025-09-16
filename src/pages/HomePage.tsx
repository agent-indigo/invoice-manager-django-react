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
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {Helmet} from 'react-helmet'
const HomePage: FunctionComponent = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate()
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
      <Button
        type='button'
        variant='primary'
        className='p-auto text-white'
        onClick={(): void => navigate('/invoices')}
      >
        <FaFileInvoiceDollar/> Invoices
      </Button>
      </Card>
    </>
  )
}
export default HomePage