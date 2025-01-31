import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/appSlice'
import productSlice from './products/productSlice'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import userSlice from './user/userSlice'
import appAdminSlice from './appAdmin/appAdminSlice'

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    appAdmin: appAdminSlice,
    user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
