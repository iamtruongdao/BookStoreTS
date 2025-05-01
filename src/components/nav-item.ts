import { Book, CreditCard, Landmark, LucideIcon, User } from 'lucide-react'

export interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavSubItem[]
}

export interface NavSubItem {
  title: string
  url: string
}

export const bookNavItems: NavItem[] = [
  {
    title: 'Quản lý sách',
    url: '/admin/book',
    icon: Book,
    isActive: true,
    items: [
      { title: 'Danh sách', url: '/admin/book' },
      { title: 'Edit', url: '/admin/book-edit' }
    ]
  },
  {
    title: 'Quản lý tác giả',
    url: '/admin/author',
    icon: User,
    isActive: true,
    items: [
      { title: 'Danh sách', url: '/admin/author' },
      { title: 'Edit', url: '/admin/author-edit' }
    ]
  },
  {
    title: 'Quản lý danh mục',
    url: '/admin/category',
    icon: User,
    isActive: true
  },
  {
    title: 'Quản lý đơn hàng',
    url: '/admin/order',
    icon: User,
    isActive: true
  }
]

export const transactionNavItems: NavItem[] = [
  {
    title: 'Quản lý giao dịch',
    url: '/dashboard/transaction',
    icon: CreditCard
  },

  {
    title: 'Nạp tiền',
    url: '/dashboard/deposit',
    icon: Landmark
  }
]
