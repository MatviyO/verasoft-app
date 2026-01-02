import { createSlice } from '@reduxjs/toolkit';

type NewOrderState = {
  overlayOpen: boolean;
};

const initialState: NewOrderState = {
  overlayOpen: false,
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    newOrderOverlayOpened: (state) => {
      state.overlayOpen = true;
    },
    newOrderOverlayClosed: (state) => {
      state.overlayOpen = false;
    },
  },
});

export const { newOrderOverlayOpened, newOrderOverlayClosed } =
  newOrderSlice.actions;

export const newOrderReducer = newOrderSlice.reducer;
