import axios from '@/config/axios'
import { BackendResponse, District, Province, Ward } from '@/types'

export const getFeeShip = (data: object) => {
  return axios.post<void, BackendResponse<any>>('ship/fee-ship', data)
}
export const getProvince = () => {
  return axios.get<void, BackendResponse<Province[]>>('ship/province')
}
export const getDistrict = (provinceId: number) => {
  return axios.get<void, BackendResponse<District[]>>(`ship/district/${provinceId}`)
}
export const getWard = (id: string) => {
  return axios.get<void, BackendResponse<Ward[]>>(`ship/ward/${id}`)
}
