import DefaultLayout from '@/layouts/DefaultLayout'
import Home from '@/pages/Home'
import LoginPage from '@/pages/Login'
import { createBrowserRouter } from 'react-router-dom'
import AuthorList from '@/pages/Author/AuthorList'
import Register from '@/pages/Register'
import { BreadType, RouteType } from '@/types'
import AuthorDetail from '@/pages/AuthorDetail'
import BookDetail from '@/pages/BookDetail'
import BookList from '@/pages/BookList'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Profile from '@/pages/Profile'
import Account from '@/pages/Profile/Account'
import ResetPassword from '@/pages/Profile/ResetPassword'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    handle: { breadcrumb: 'Trang chủ' } as RouteType, // Thêm handle vào đây
    children: [
      {
        index: true, // Định nghĩa rõ ràng thay vì index: true
        element: <Home />
      },
      {
        path: 'author',
        element: <AuthorList />,
        handle: { breadcrumb: 'Tác giả' } as RouteType
      },
      {
        path: 'author/:id',
        element: <AuthorDetail />,
        handle: {
          breadcrumb: (match, paramName) => {
            const { id } = match.params
            const arr: BreadType[] = [{ name: 'Tác giả', pathname: '/author' }]
            if (paramName) {
              console.log(paramName)
              arr.push({ name: paramName[id], pathname: `/author/${id}` })
              return arr
            }
            arr.push({ name: id, pathname: `/author/${id}` })
            return arr
          }
        } as RouteType
      },
      {
        path: 'book/:id',
        element: <BookDetail />,
        handle: {
          breadcrumb: (match, paramName) => {
            const { id } = match.params
            const arr: BreadType[] = []
            if (paramName) {
              arr.push(
                { name: paramName.name, pathname: `/category/${paramName.slug}` },
                { name: paramName[id], pathname: `/book/${id}` }
              )

              return arr
            }
            arr.push({ name: id, pathname: `/book/${id}` })
            return arr
          }
        } as RouteType
      },
      {
        path: 'book',
        element: <BookList />,
        handle: {
          breadcrumb: (match, paramName) => {
            const { id } = match.params
            const arr: BreadType[] = []
            if (paramName) {
              arr.push(
                { name: paramName.name, pathname: `/category/${paramName.slug}` },
                { name: paramName[id], pathname: `/book/${id}` }
              )

              return arr
            }
            arr.push({ name: id, pathname: `/book/${id}` })
            return arr
          }
        } as RouteType
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          { index: true, element: <Account /> },
          { path: 'password', element: <ResetPassword /> }
        ]
      },
      { path: 'category/:category', element: <BookList /> },
      { path: 'search', element: <BookList /> }
    ]
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Register /> }
])
export default router
