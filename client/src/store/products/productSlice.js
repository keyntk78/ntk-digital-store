import { createSlice } from '@reduxjs/toolkit'
import * as actions from '../products/productAction'

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    newProducts: [],
    isLoading: false,
    erroMessege: '',
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.newProducts = action.payload
    })

    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.isLoading = false
      state.erroMessege = action.payload.message
    })
  },
})

// export const {} = appSlice.actions

export default productSlice.reducer
