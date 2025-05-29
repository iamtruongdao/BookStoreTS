import axios from '@/config/axios'
import { BackendResponse, Paginate, UserDiscount } from '@/types'
export const saveVoucher = (data: { discountId: string; userId: string }) => {
  return axios.post<void, BackendResponse<unknown>>('/user-voucher/save-voucher', data)
}
export const getVoucherSave = (params: { pageNumber: number; pageSize: number }) => {
  return axios.get<void, BackendResponse<Paginate<UserDiscount>>>('/user-voucher/get-user-voucher', { params })
}
export const deleteVoucher = (id: string) => {
  return axios.delete<void, BackendResponse<unknown>>(`/user-voucher/delete-by-id/${id}`)
}
