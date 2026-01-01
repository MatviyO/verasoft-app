import { combineReducers } from '@reduxjs/toolkit'
import { customerReducer } from '@/features/customer/customerSlice'
import { ordersReducer } from '@/features/orders/ordersSlice'

export const rootReducer = combineReducers({
  customer: customerReducer,
  orders: ordersReducer,
})
