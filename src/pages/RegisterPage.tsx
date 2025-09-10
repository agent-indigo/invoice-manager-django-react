import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  useState
} from 'react'
import {
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
import {
  Form,
  Button
} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {
  FaKey,
  FaCheck,
  FaIdBadge,
  FaEnvelope,
  FaUserPlus
} from 'react-icons/fa'
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const RegisterPage: FunctionComponent = (): ReactElement => {
  const [
    first_name,
    set_first_name
  ] = useState<string>('')
  const [
    last_name,
    set_last_name
  ] = useState<string>('')
  const [
    email,
    setEmail
  ] = useState<string>('')
  const [
    username,
    setUsername
  ] = useState<string>('')
  const [
    password,
    setPassword
  ] = useState<string>('')
  const [
    confirmPassword,
    setConfirmPassword
  ] = useState<string>('')
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const {setUser}: ContextProps = useGetContext()
  const navigate: NavigateFunction = useNavigate()
  const submitHandler: Function = async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      '/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          username,
          password,
          confirmPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      setUser(await response.json())
      navigate('/')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Processing...' : 'Setup'} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaUserPlus/> Register
          </h1>
          <Form action={submitHandler.bind(null)}>
            <Form.Group
              controlId='first_name'
              className='my-3'
            >
              <Form.Label>
                <FaIdBadge/> First name
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                value={first_name}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => set_first_name(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              controlId='last_name'
              className='my-3'
            >
              <Form.Label>
                <FaIdBadge/> Last name
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                value={last_name}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => set_last_name(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId='email'
              className='my-3'
            >
              <Form.Label>
                <FaEnvelope/> Email address
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId='username'
              className='my-3'
            >
              <Form.Label>
                <FaIdBadge/> Username
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setUsername(event.target.value)}
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
              />
            </Form.Group>
            <Form.Group
              controlId='confirmPassword'
              className='my-3'
            >
              <Form.Label>
                <FaCheck/> Confirm password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setConfirmPassword(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={loading || !password || !confirmPassword}
            >
              <FaCheck/> Confirm
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default RegisterPage