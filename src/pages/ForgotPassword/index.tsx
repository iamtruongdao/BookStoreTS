import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { changePasswordApi, sendOtpApi } from '@/apis/auth.api'
import { debounce } from 'lodash'
import { Loader2 } from 'lucide-react'

const ForgotPassword = () => {
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [sendOTPSuccess, setSendOTPSuccess] = useState('')
  const [isLoading, setLoading] = useState(false)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
    setNewPasswordError('')
  }

  const handleConfirmNewPasswordChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPasswordError('')
    const value = e.target.value
    if (value !== newPassword) {
      setConfirmNewPasswordError('Xác nhận mật khẩu k chính xác')
    } else {
      setConfirmNewPassword(e.target.value)
    }
  }, 300)

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)
    setOtpError('')
  }

  const isValidForm = () => {
    let isValid = true
    if (!email) {
      setEmailError('Email không được trống')
      isValid = false
    }
    if (!newPassword) {
      setNewPasswordError('Mật khẩu mới không được trống')
      isValid = false
    }
    if (!confirmNewPassword) {
      setConfirmNewPasswordError('Nhập lại mật khẩu mới không được trống')
      isValid = false
    }
    if (!otp) {
      setOtpError('OTP không được trống')
      isValid = false
    }
    return isValid
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [timerRunning])

  useEffect(() => {
    if (timeRemaining === 0) {
      setButtonDisabled(false)
      setTimerRunning(false)
      setTimeRemaining(60)
    }
  }, [timeRemaining])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setTimerRunning(true)
    setButtonDisabled(true)
    setSendOTPSuccess('')
    try {
      const response = await sendOtpApi({ email })
      if (response.code === 0) {
        setSendOTPSuccess('Đã gửi mã xác nhận về Email')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidForm()) {
      try {
        setLoading(true)
        const response = await changePasswordApi({ email, otp, password: confirmNewPassword })
        if (response.code === 0) {
          setShowDialog(true)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-md w-full relative'>
        <h3 className='text-xl font-bold mb-4'>Đặt lại mật khẩu</h3>
        <p className='text-sm text-gray-600 mb-4'>
          Sau khi nhập email và mật khẩu mới, nhấn "Gửi". Mã xác nhận sẽ được gửi tới Email của bạn, nhập mã vào ô OTP
          sau đó nhấn "Cập nhật".
        </p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Input type='text' placeholder='Email' value={email} onChange={handleEmailChange} />
            <p className='text-sm text-red-500 mt-1'>{emailError}</p>
          </div>
          <div>
            <Input type='password' placeholder='Mật khẩu mới' value={newPassword} onChange={handleNewPasswordChange} />
            <p className='text-sm text-red-500 mt-1'>{newPasswordError}</p>
          </div>
          <div>
            <Input
              type='password'
              placeholder='Nhập lại mật khẩu mới'
              defaultValue={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
            <p className='text-sm text-red-500 mt-1'>{confirmNewPasswordError}</p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex-1'>
              <Input type='text' placeholder='OTP' value={otp} onChange={handleOTPChange} />
              <p className='text-sm text-red-500 mt-1'>{otpError}</p>
              <p className='text-sm text-green-500 mt-1'>{sendOTPSuccess}</p>
            </div>
            <Button type='button' onClick={handleSendOTP} disabled={buttonDisabled} variant='secondary'>
              Gửi ({timeRemaining})
            </Button>
          </div>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Đang cập nhật...
              </>
            ) : (
              'Cập nhật'
            )}
          </Button>
        </form>
        <div className='text-center mt-4'>
          <span className='text-sm text-gray-600'>Quay lại</span>
          <Link to='/login' className='ml-1 text-sm text-blue-600 hover:underline'>
            Đăng nhập
          </Link>
        </div>
      </div>
      {showDialog && (
        <div className='absolute inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center z-10'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <p className='text-lg font-semibold text-green-600 mb-2'>Cập nhật mật khẩu thành công!</p>
            <Link to='/login' className='text-blue-600 underline'>
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
