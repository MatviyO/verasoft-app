import { customerReducer } from '@/features/customer/customerSlice';
import { newOrderReducer } from '@/features/new-order/newOrderSlice';
import { ordersReducer } from '@/features/orders/ordersSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  customer: customerReducer,
  newOrder: newOrderReducer,
  orders: ordersReducer,
});
