import {
  FunctionComponent,
  ReactElement,
  useState
} from 'react'
import {Helmet} from 'react-helmet'
import {toast} from 'react-toastify'
import ContextProps from '@/types/ContextProps'
import {useGetContext} from '../components/ContextProvider'
const CurrentUserPage: FunctionComponent = (): ReactElement => {
  const {
    user,
    setUser,
    token
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
    username,
    setUsername
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
    confirmNewPassword,
    setConfirmNewPassword
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
    username !== user?.username && patch.append(
      'username',
      username
    )
    password !== '' && patch.append(
      'password',
      password
    )
    newPassword !== '' && patch.append(
      'newPassword',
      newPassword
    )
    confirmNewPassword !== '' && patch.append(
      'confirmNewPassword',
      confirmNewPassword
    )
    const response: Response = await fetch('/api/auth/user', {
      method: 'PATCH',
      body: JSON.stringify(Object.fromEntries(patch.entries())),
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      setUser(await response.json())
      toast.success('Changes saved.')
      setPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Processing...' : user?.username} | Invoices
        </title>
      </Helmet>
    </>
  )
}
export default CurrentUserPage