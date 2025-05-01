import AdminLayout from '@/layouts/AdminLayout'
import AuthorPage from '@/pages/Admin/AuthorPage'
import AuthorEdit from '@/pages/Admin/AuthorPage/AuthorEdit'
import BookPage from '@/pages/Admin/BookPage'
import BookEdit from '@/pages/Admin/BookPage/BookEdit'
import CategoryPage from '@/pages/Admin/CategoryPage'
import OrderPage from '@/pages/Admin/OrderPage'
import { RouteObject } from 'react-router-dom'

export const adminRoutes: RouteObject = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    { path: 'book', element: <BookPage /> },
    { path: 'book-edit', element: <BookEdit /> },
    { path: 'author', element: <AuthorPage /> },
    { path: 'author-edit', element: <AuthorEdit /> },
    { path: 'category', element: <CategoryPage /> },
    { path: 'order', element: <OrderPage /> }
  ]
}
