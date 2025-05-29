import AdminLogin from '@/pages/Admin/Login'
import ForgotPassword from '@/pages/ForgotPassword'
import LoginPage from '@/pages/Login'
import Register from '@/pages/Register'
import { RouteObject } from 'react-router-dom'
import UnauthorizeRoute from './UnAuthorizeRoute'

export const privateRoute: RouteObject[] = [
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/login', element: <UnauthorizeRoute />, children: [{ index: true, element: <LoginPage /> }] },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/register', element: <Register /> }
]
