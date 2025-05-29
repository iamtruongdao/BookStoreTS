import { useAppSelector } from '@/hooks'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const UnauthorizeRoute = () => {
  const location = useLocation()
  const { isLogin } = useAppSelector((state) => state.user)
  if (!isLogin) return <Outlet />
  if (location.pathname.startsWith('/admin')) return <Navigate to={'/admin'} replace />
  return <Navigate to={'/'} replace />
}

export default UnauthorizeRoute
