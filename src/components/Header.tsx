import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Navbar,
  Nav,
  Container,
  Button
} from 'react-bootstrap'
import {
  FaUser,
  FaArrowLeft,
  FaFileInvoiceDollar
} from 'react-icons/fa'
import {
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {toast} from 'react-toastify'
import {useGetContext} from './ContextProvider'
import ContextProps from '@/types/ContextProps'
const Header: FunctionComponent = (): ReactElement => {
  const {
    user,
    setUser,
    setInvoices
  }: ContextProps = useGetContext()
  const token: string = localStorage.getItem('token') ?? ''
  const navigate: NavigateFunction = useNavigate()
  const handleLogout: Function = async (): Promise<void> => {
    const response: Response = await fetch(
      '/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        }
      }
    )
    if (response.ok) {
      setUser(undefined)
      localStorage.removeItem('token')
      setInvoices([])
      navigate('/welcome')
      toast.success('Logged out.')
    } else {
      toast.error(await response.text())
    }
  }
  return (
    <header>
      <Navbar
        bg='dark'
        expand='sm'
        collapseOnSelect
        className='text-center'
      >
        <Container className='justify-content-center'>
          <LinkContainer to='/home'>
            <Navbar.Brand className='text-white'>
              <FaFileInvoiceDollar/> Invoices
            </Navbar.Brand>
          </LinkContainer>
          {user && (
            <>
              <Navbar.Toggle aria-controls='basic-navbar-nav'/>
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                  <Button
                    type='button'
                    variant='primary'
                    className='p-auto text-white'
                    onClick={(): void => navigate('/user')}
                  >
                    <FaUser/> {user?.username}
                  </Button>
                  <div className="px-1 py-1"/>
                  <Button
                    type='button'
                    variant='primary'
                    className='p-auto text-white'
                    onClick={handleLogout.bind(null)}
                  >
                    <FaArrowLeft/> Log out
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  )
}
export default Header