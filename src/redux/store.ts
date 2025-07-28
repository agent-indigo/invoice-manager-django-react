import {
  configureStore,
  EnhancedStore
} from '@reduxjs/toolkit'
import apiSlice from './apiSlice'
const store: EnhancedStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false
})
export default store