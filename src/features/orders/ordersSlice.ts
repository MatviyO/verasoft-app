import type { Order } from '@/entities/order/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrdersState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  orders: Order[];
  tabs: string[];
  activeTab: string;
  filter: 'sent' | 'errors';
  errorsLoading: boolean;
};

const initialState: OrdersState = {
  status: 'idle',
  error: null,
  orders: [],
  tabs: [],
  activeTab: 'Orders AAA',
  filter: 'sent',
  errorsLoading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersRequested: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    ordersSucceeded: (
      state,
      action: PayloadAction<{ orders: Order[]; tabs: string[] }>,
    ) => {
      state.status = 'success';
      state.orders = action.payload.orders;
      state.tabs = action.payload.tabs;
      if (!state.tabs.includes(state.activeTab) && state.tabs.length > 0) {
        state.activeTab = state.tabs[0];
      }
    },
    ordersFailed: (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
    },
    ordersTabChanged: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    ordersFilterChanged: (state, action: PayloadAction<'sent' | 'errors'>) => {
      state.filter = action.payload;
    },
    ordersErrorsLoadingSet: (state, action: PayloadAction<boolean>) => {
      state.errorsLoading = action.payload;
    },
  },
});

export const {
  ordersRequested,
  ordersSucceeded,
  ordersFailed,
  ordersTabChanged,
  ordersFilterChanged,
  ordersErrorsLoadingSet,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
