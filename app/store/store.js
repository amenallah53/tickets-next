import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from './slices/ticketsSlice'

export default configureStore({
  reducer: {
    tickets: ticketsReducer
  }
})