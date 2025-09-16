import {
  useState,
  FunctionComponent,
  ReactElement,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import {
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
import {
  Form,
  Button
} from 'react-bootstrap'
import {
  FaKey,
  FaArrowRight,
  FaUser,
  FaUserTag
} from 'react-icons/fa'
import {Helmet} from 'react-helmet'
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
import LogInResponse from '@/types/LogInResponse'
const LoginPage: FunctionComponent = (): ReactElement => {
  const {
    setUser,
    setToken
  }: ContextProps = useGetContext()
  const navigate: NavigateFunction = useNavigate()
  const [
    username,
    setUsername
  ] = useState<string>('')
  const [
    password,
    setPassword
  ] = useState<string>('')
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const handleSubmit: Function = async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      '/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      const {
        user,
        token
      }: LogInResponse = await response.json()
      setUser(user)
      setToken(token)
      navigate('/home')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Processing...' : 'Log In'} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaUser/> Log in
          </h1>
          <Form action={handleSubmit.bind(null)}>
            <Form.Group
              controlId='name'
              className='my-3'
            >
              <Form.Label>
                <FaUserTag/> User name
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter user name'
                value={username}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setUsername(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              controlId='password'
              className='my-3'
            >
              <Form.Label>
                <FaKey/> Password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
                onKeyDown={async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => event.key === 'Enter' && await handleSubmit()}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={
                loading ||
                username === '' ||
                password === ''
              }
            >
              Log in <FaArrowRight/>
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default LoginPage