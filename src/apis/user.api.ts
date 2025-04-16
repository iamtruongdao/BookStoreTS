import axios from '@/config/axios'
import { BackendResponse } from '@/types'

export const updateInfoApi = (data: { email: string; phoneNumber: string; fullName: string; address: string }) => {
  return axios.post<void, BackendResponse<unknown>>('/auth/update-info', data)
}
