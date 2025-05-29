import { useState, useEffect } from 'react'
import { Lock, Home, ArrowLeft, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function UnauthorizedPage() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGoBack = () => navigate(-1)

  const handleGoHome = () => {
    // Chuyển về trang chủ
    window.location.href = '/'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000'></div>
      </div>

      <div
        className={`relative z-10 max-w-md w-full text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Main Icon */}
        <div className='mb-8 relative'>
          <div className='mx-auto w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce'>
            <Lock className='w-12 h-12 text-white' />
          </div>
          <div className='absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse'>
            <span className='text-white text-xl font-bold'>!</span>
          </div>
        </div>

        {/* Error Code */}
        <div className='mb-6'>
          <h1 className='text-8xl font-bold text-white/90 mb-2 tracking-tight'>401</h1>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <Shield className='w-5 h-5 text-red-400' />
            <h2 className='text-2xl font-semibold text-white'>Unauthorized</h2>
          </div>
        </div>

        {/* Message */}
        <div className='mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
          <p className='text-white/90 text-lg mb-2'>Bạn không có quyền truy cập vào trang này</p>
          <p className='text-white/70 text-sm'>Vui lòng đăng nhập với tài khoản có quyền hạn phù hợp</p>
        </div>

        {/* Action Buttons */}
        <div className='space-y-3'>
          <button
            onClick={handleGoBack}
            className='w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
          >
            <ArrowLeft className='w-5 h-5' />
            Quay lại trang trước
          </button>

          <button
            onClick={handleGoHome}
            className='w-full bg-transparent border-2 border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm'
          >
            <Home className='w-5 h-5' />
            Về trang chủ
          </button>
        </div>

        {/* Additional Info */}
        <div className='mt-8 text-white/60 text-sm'>
          <p>Mã lỗi: AUTH_ERROR_401</p>
          <p className='mt-1'>Thời gian: {new Date().toLocaleString('vi-VN')}</p>
        </div>
      </div>
    </div>
  )
}
