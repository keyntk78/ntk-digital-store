import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  accessToken: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.userInfo = action.payload.userInfo
      state.accessToken = action.payload.accessToken
    }
  }
})

export const { login } = userSlice.actions

export default userSlice.reducer
