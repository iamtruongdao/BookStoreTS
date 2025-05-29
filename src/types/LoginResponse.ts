import { UserResponse } from '@/types'

export interface LoginResponse {
  message: string
  token: { accessToken: string }
  userAccount: UserResponse
  roles: string[]
}
