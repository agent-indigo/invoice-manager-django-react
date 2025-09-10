import Data from '@/types/Data'
export default interface User extends Data {
  username: string
  is_superuser: boolean
  is_staff: boolean
}