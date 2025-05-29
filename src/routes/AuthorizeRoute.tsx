import { useAppSelector } from '@/hooks'
import { Role } from '@/utils/constant'
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthorizeRoute = () => {
  const location = useLocation()
  const {
    isLogin,
    userInfo: { roles }
  } = useAppSelector((state) => state.user)
  if (!isLogin) return <Navigate to={'/login'} replace />
  if (location.pathname.startsWith('/admin')) {
    const isAdmin = roles?.includes(Role.Admin) // hoặc roles?.some(role => role === 'admin')
    if (!isAdmin) {
      return <Navigate to={'/unauthorized'} replace />
    }
  }
  return <Outlet />
}

export default AuthorizeRoute
