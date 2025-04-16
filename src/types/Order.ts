import { OrderState, PAYMENT } from '@/utils/constant'

export interface OrderAddress {
  address: string
  street: string
  district: string
  city: string
  fullName: string
  phoneNumber: string
}

export interface OrderItem {
  productId: string
  productName: string
  avatar: string
  price: number
  discount: number
  quantity: number
}

export interface OrderProduct {
  totalPrice: number
  totalApplyDiscount: number
  item: OrderItem
}

export interface OrderCheckout {
  totalPrice: number
  totalApplyDiscount: number
  feeShip: number
}

export interface Order {
  id: string
  userId: string
  orderCheckout: OrderCheckout
  orderAddress: OrderAddress
  orderItem: OrderProduct[]
  orderStatus: OrderState
  orderPayment: PAYMENT
  orderCode: number
  linkPayment: string
  createdAt: Date
}
export interface Checkout {
  cartId: string
  userId: string
  items: { productId: string; discount: number; price: number; quantity: number }[]
}
