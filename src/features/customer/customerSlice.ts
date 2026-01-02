import type {
  CarrierStatus,
  CommunicationStats,
  CustomerProfile,
} from '@/entities/customer/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CustomerState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  profile: CustomerProfile | null;
  stats: CommunicationStats | null;
  carrier: CarrierStatus | null;
  error: string | null;
};

const initialState: CustomerState = {
  status: 'idle',
  profile: null,
  stats: null,
  carrier: null,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerRequested: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    customerSucceeded: (
      state,
      action: PayloadAction<{
        profile: CustomerProfile;
        stats: CommunicationStats;
        carrier: CarrierStatus;
      }>,
    ) => {
      state.status = 'success';
      state.profile = action.payload.profile;
      state.stats = action.payload.stats;
      state.carrier = action.payload.carrier;
    },
    customerFailed: (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { customerRequested, customerSucceeded, customerFailed } =
  customerSlice.actions;

export const customerReducer = customerSlice.reducer;
