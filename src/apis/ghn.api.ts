import axios from '@/config/axios'
import {
  BackendResponse,
  CreateOrderRespone,
  District,
  OrderAddress,
  OrderCheckout,
  Province,
  ShopResponse,
  Ward
} from '@/types'

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
export const getShop = () => {
  return axios.get<void, ShopResponse>(`ship/shop-info`)
}
export const printShip = (orderCode: string) => {
  return axios.get<void, BackendResponse<{ token: string }>>(`ship/print-shipment?order_code=${orderCode}`)
}
export const CreateOrderShip = (data: {
  total: OrderCheckout
  address: OrderAddress
  orderCode: string
  time: number
}) => {
  return axios.post<void, CreateOrderRespone>(`ship/create-order`, data)
}
