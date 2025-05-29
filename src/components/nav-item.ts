import {
  Book,
  LucideIcon,
  SquareDashed,
  User,
  StickyNote,
  Tag,
  TicketPercent,
  ChartBarStacked,
  BaggageClaim
} from 'lucide-react'

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
    title: 'Thống kê',
    url: '/admin',
    icon: SquareDashed,
    isActive: false
  },
  {
    title: 'Quản lý sách',
    url: '/admin/book',
    icon: Book,
    isActive: false,
    items: [
      { title: 'Danh sách', url: '/admin/book' },
      { title: 'Edit', url: '/admin/book-edit' }
    ]
  },
  {
    title: 'Quản lý tác giả',
    url: '/admin/author',
    icon: User,
    isActive: false,
    items: [
      { title: 'Danh sách', url: '/admin/author' },
      { title: 'Edit', url: '/admin/author-edit' }
    ]
  },
  {
    title: 'Quản lý danh mục',
    url: '/admin/category',
    icon: ChartBarStacked,
    isActive: false
  },
  {
    title: 'Quản lý đơn hàng',
    url: '/admin/order',
    icon: BaggageClaim,
    isActive: false
  },
  {
    title: 'Quản lý tài khoản',
    url: '/admin/user',
    icon: User,
    isActive: true
  },
  {
    title: 'Quản lý bài đăng',
    url: '/admin/post',
    icon: StickyNote,
    isActive: false,
    items: [
      { title: 'Danh sách', url: '/admin/post' },
      { title: 'Edit', url: '/admin/post-edit' }
    ]
  },
  {
    title: 'Quản lý chủ đề',
    url: '/admin/tag',
    icon: Tag,
    isActive: false,
    items: [
      { title: 'Danh sách', url: '/admin/tag' },
      { title: 'Edit', url: '/admin/tag-edit' }
    ]
  },
  {
    title: 'Quản lý voucher',
    url: '/admin/voucher',
    icon: TicketPercent,
    isActive: false,
    items: [
      { title: 'Danh sách', url: '/admin/voucher' },
      { title: 'Edit', url: '/admin/voucher-edit' }
    ]
  }
]
