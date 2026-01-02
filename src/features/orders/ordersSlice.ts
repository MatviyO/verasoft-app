import type { Order } from '@/entities/order/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrdersSortKey = 'date' | 'subject' | 'type' | 'orderNumber';
export type OrdersSortDirection = 'asc' | 'desc';

type OrdersState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  orders: Order[];
  tabs: string[];
  activeTab: string;
  filter: 'sent' | 'errors';
  sortKey: OrdersSortKey;
  sortDirection: OrdersSortDirection;
};

const initialState: OrdersState = {
  status: 'idle',
  error: null,
  orders: [],
  tabs: ['Orders A', 'Orders AA', 'Orders AAA', 'Orders B', 'Orders C'],
  activeTab: 'Orders AAA',
  filter: 'sent',
  sortKey: 'date',
  sortDirection: 'desc',
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersRequested: (
      state,
      action: PayloadAction<{ delayMs?: number } | undefined>,
    ) => {
      state.status = 'loading';
      state.error = null;
      void action;
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
    ordersSortChanged: (state, action: PayloadAction<OrdersSortKey>) => {
      if (state.sortKey === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
        return;
      }
      state.sortKey = action.payload;
      state.sortDirection = 'asc';
    },
  },
});

export const {
  ordersRequested,
  ordersSucceeded,
  ordersFailed,
  ordersTabChanged,
  ordersFilterChanged,
  ordersSortChanged,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
