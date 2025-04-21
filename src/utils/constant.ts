export enum OrderState {
  Pending = 'Pending',
  WaitingPickup = 'WaitingPickup',
  Shipping = 'Shipping',
  Cancel = 'Cancel',
  Delivered = 'Delivered'
}
export enum PaymentStatus {
  Paid = 'Paid',
  WaitingPaid = 'WaitingPaid',
  Refund = 'Refund',
  Failed = 'Failed'
}
export const statusMap: { [key in OrderState]: { text: string; color: string } } = {
  [OrderState.Pending]: { text: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' },
  [OrderState.WaitingPickup]: { text: 'Chờ lấy hàng', color: 'bg-blue-100 text-blue-800' },
  [OrderState.Shipping]: { text: 'Đang giao', color: 'bg-indigo-100 text-indigo-800' },
  [OrderState.Delivered]: { text: 'Đã giao', color: 'bg-green-100 text-green-800' },
  [OrderState.Cancel]: { text: 'Đã hủy', color: 'bg-red-100 text-red-800' }
}
export enum PAYMENT {
  COD = 'COD',
  VNPAY = 'VNPAY'
}
