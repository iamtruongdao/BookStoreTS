import { GetUser, LoginApi, LogoutApi } from '@/apis/auth.api'
import { UserResponse } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { resetCart } from '@/redux/slice/cartSlice'
export const loginAction = createAsyncThunk('user/login', async (data: { email: string; password: string }) => {
  return await LoginApi(data)
})
export const logoutAction = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  dispatch(resetCart())
  await LogoutApi()
})
export const getUserAction = createAsyncThunk('user/get-user', async () => {
  return (await GetUser()).data
})
interface UserState {
  userInfo: UserResponse
  accessToken: string
  isLogin: boolean
}
const initialState: UserState = {
  userInfo: { address: '', email: '', fullName: '', isLocked: false, phoneNumber: '', roles: [], id: '' },
  accessToken: '',
  isLogin: false
}
const userSlide = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAction.pending, (state) => {
      state.isLogin = false
    })
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLogin = true
      const data = action.payload.data
      state.userInfo = data.userAccount
      const token = data.token.accessToken
      state.accessToken = token
      const expiryDate = new Date()
      expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
      document.cookie = `actk=${token}; samesite=none; secure; path=/; expires=${expiryDate.toUTCString()}`
    })
    builder.addCase(loginAction.rejected, (state) => {
      state.isLogin = false
    })
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isLogin = false
      state.userInfo = { address: '', email: '', fullName: '', isLocked: false, phoneNumber: '', roles: [], id: '' }
      document.cookie = 'actk=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=none; secure'
    })
    builder.addCase(getUserAction.fulfilled, (state, { payload }) => {
      state.isLogin = true
      state.userInfo = payload
    })
    builder.addCase(getUserAction.rejected, (state) => {
      state.userInfo = { address: '', email: '', fullName: '', isLocked: false, phoneNumber: '', roles: [], id: '' }
    })
  }
})
export default userSlide.reducer
