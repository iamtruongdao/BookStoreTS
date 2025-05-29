import { UserResponse } from '@/types'

export interface LoginResponse {
  message: string
  token: { accessToken: string; refreshToken: string }
  userAccount: UserResponse
  roles: string[]
}
