export default interface User {
  id: number
  first_name?: string
  last_name?: string
  email?: string
  username: string
  is_superuser: boolean
  is_staff: boolean
  date_joined: Date
  last_login?: Date
}