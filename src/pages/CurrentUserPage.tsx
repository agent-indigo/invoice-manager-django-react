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
  FaKey,
  FaCheck,
  FaIdBadge,
  FaEnvelope,
  FaUser,
  FaTimes,
  FaArrowLeft
} from 'react-icons/fa'
import {
  Form,
  Button
} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {toast} from 'react-toastify'
import {useGetContext} from '../components/ContextProvider'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import ContextProps from '@/types/ContextProps'
const CurrentUserPage: FunctionComponent = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate()
  const {
    user,
    setUser,
    token,
    setToken,
    setInvoices
  }: ContextProps = useGetContext()
  const [
    first_name,
    set_first_name
  ] = useState<string>(user?.first_name ?? '')
  const [
    last_name,
    set_last_name
  ] = useState<string>(user?.last_name ?? '')
  const [
    email,
    setEmail
  ] = useState<string>(user?.email ?? '')
  const [
    newUsername,
    setNewUsername
  ] = useState<string>(user?.username ?? '')
  const [
    password,
    setPassword
  ] = useState<string>('')
  const [
    newPassword,
    setNewPassword
  ] = useState<string>('')
  const [
    confirmPassword,
    setConfirmPassword
  ] = useState<string>('')
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const handleSubmit: Function = async (): Promise<void> => {
    setLoading(true)
    const patch: FormData = new FormData()
    first_name !== user?.first_name && patch.append(
      'first_name',
      first_name
    )
    last_name !== user?.last_name && patch.append(
      'last_name',
      last_name
    )
    email !== user?.email && patch.append(
      'email',
      email
    )
    newUsername !== user?.username && patch.append(
      'newUsername',
      newUsername
    )
    password !== '' && patch.append(
      'password',
      password
    )
    newPassword !== '' && patch.append(
      'newPassword',
      newPassword
    )
    confirmPassword !== '' && patch.append(
      'confirmPassword',
      confirmPassword
    )
    const response: Response = await fetch(
      '/api/auth/user', {
        method: 'PATCH',
        body: JSON.stringify(Object.fromEntries(patch.entries())),
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      setUser(await response.json())
      toast.success('Changes saved.')
      setPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  const handleEnterKey: Function = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.key === 'Enter') password === '' ? toast.error('Your current password is needed to make changes.') : newPassword === '' ? await handleSubmit() : newPassword === confirmPassword ? await handleSubmit() : toast.error('New passwords do not match.')
  }
  const handleDelete: Function = async (): Promise<void> => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      setLoading(true)
      const response: Response = await fetch(
        '/api/auth/user', {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      if (response.ok) {
        toast.success('Account deleted.')
        setUser(undefined)
        setToken('')
        setInvoices([])
        navigate('/welcome')
      } else {
        toast.error(await response.text())
      }
      setLoading(false)
    }
  }
  const handleLogoutAll: Function = async (): Promise<void> => {
    if (!window.confirm('Are you sure you want to log out from all devices? This action cannot be undone!')) {
      setLoading(true)
      const response: Response = await fetch(
        '/api/auth/logoutall', {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      if (response.ok) {
        toast.success('Logged out from all devices.')
        setUser(undefined)
        setToken('')
        setInvoices([])
        navigate('/welcome')
      } else {
        toast.error(await response.text())
      }
      setLoading(false)
    }
  }
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Processing...' : user?.username} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaUser/> {user?.username}
          </h1>
          <Form action={handleSubmit.bind(null)}>
            <Form.Group
              className='my-3'
              controlId='first_name'
            >
              <Form.Label>
                <FaIdBadge/> First Name
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your first name'
                value={first_name}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => set_first_name(event.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group
              className='my-3'
              controlId='last_name'
            >
              <Form.Label>
                <FaIdBadge/> Last Name
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your last name'
                value={last_name}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => set_last_name(event.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group
              className='my-3'
              controlId='email'
            >
              <Form.Label>
                <FaEnvelope/> Email Address
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group
              className='my-3'
              controlId='username'
            >
              <Form.Label>
                <FaIdBadge/> Username
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                value={user?.username}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setNewUsername(event.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <hr/>
            <Form.Group
              className='my-3'
              controlId='password'
            >
              <Form.Label>
                <FaKey/> Current Password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password to make changes'
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
                disabled={loading}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className='my-3'
              controlId='newPassword'
            >
              <Form.Label>
                <FaKey/> New Password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter new password'
                value={newPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setNewPassword(event.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group
              className='my-3'
              controlId='confirmPassword'
            >
              <Form.Label>
                <FaCheck/> Confirm New Password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm new password'
                value={confirmPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setConfirmPassword(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
                disabled={loading}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={
                loading ||
                password === '' ||
                (newPassword !== '' && newPassword !== confirmPassword)
              }
            >
              <FaCheck/> Save Changes
            </Button>
            <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              onClick={(): void => navigate('/')}
              disabled={loading}
            >
              <FaTimes/> Cancel
            </Button>
            <Button
              type='button'
              variant='warning'
              className='p-auto text-white'
              onClick={handleLogoutAll.bind(null)}
              disabled={loading}
            >
              <FaArrowLeft/> Log out from all devices
            </Button>
            <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              onClick={handleDelete.bind(null)}
              disabled={
                loading ||
                password === ''
              }
            >
              <FaTimes/> Delete Account
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default CurrentUserPage