import { createSlice } from '@reduxjs/toolkit'

export const appAdminSlice = createSlice({
  name: 'appAdmin',
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

// export const {} = appSlice.actions
export const { setLoading } = appAdminSlice.actions

export default appAdminSlice.reducer
