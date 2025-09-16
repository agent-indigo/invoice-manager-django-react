import User from '@/types/User'
export default interface LogInResponse {
  user: User;
  token: string;
}