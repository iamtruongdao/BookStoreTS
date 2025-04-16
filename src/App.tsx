import { GetUser } from '@/apis/auth.api'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setLoading } from '@/redux/slice/appSlice'
import router from '@/routes'
import { ColorRing } from 'react-loader-spinner'
import { getCartAction } from '@/redux/slice/cartSlice'
import { getUserAction } from './redux/slice/userSlice'
function App() {
  const {
    isLogin,
    userInfo: { id }
  } = useAppSelector((state) => state.user)
  const { isGlobalLoading } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      if (isLogin) {
        try {
          dispatch(setLoading(true)) // Bật loading trước khi gọi API
          dispatch(getUserAction()) // Chờ API hoàn thành
          dispatch(getCartAction(id))
        } catch (error) {
          console.log(error)
        } finally {
          dispatch(setLoading(false))
        }
      }
    }
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])
  return (
    <>
      <div className={`${isGlobalLoading ? 'overflow-auto  hide-scrollbar' : ''} h-screen`}>
        {/* Loading Overlay */}
        {isGlobalLoading && (
          <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-[9999]'>
            <ColorRing
              visible={isGlobalLoading}
              ariaLabel='color-ring-loading'
              wrapperStyle={{ width: '120px', height: '120px' }}
              wrapperClass='color-ring-wrapper'
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
        {/* Nội dung chính */}
        <RouterProvider router={router} />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </>
  )
}

export default App
