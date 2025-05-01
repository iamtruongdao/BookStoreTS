import axios from '@/config/axios'
import { BackendResponse, Checkout, Order, OrderAddress, OrderCheckout, OrderProduct, Paginate } from '@/types'
export const checkOutApi = (data: Checkout) => {
  return axios.post<void, BackendResponse<{ checkout: OrderCheckout; items: OrderProduct[] }>>('/order/checkout', data)
}
export const getOrderByUserIdApi = (status?: string) => {
  return axios.get<void, BackendResponse<Order[]>>(`/order/get-order`, {
    params: status !== 'all' ? { status } : undefined
  })
}
export const getOrderByIdApi = (id: string) => {
  return axios.get<void, BackendResponse<Order>>(`/order/get-by-id/${id}`)
}
export const createOrderApi = (data: {
  address: OrderAddress
  orderPayment: string
  feeShip: number
  checkout: Checkout
}) => {
  return axios.post<void, BackendResponse<unknown>>(`/order/add`, data)
}
export const getOrderFilterApi = (params: Record<string, string>) => {
  return axios.get<void, BackendResponse<Paginate<Order>>>(`/order/paginate`, {
    params
  })
}

export const confirmOrderApi = (id: string) => {
  return axios.post<void, BackendResponse<Order>>(`/order/update-status`, {
    orderId: id
  })
}
export const cancelOrderApi = (id: string) => {
  return axios.post<void, BackendResponse<Order>>(`/order/cancel-order`, {
    orderId: id
  })
}
