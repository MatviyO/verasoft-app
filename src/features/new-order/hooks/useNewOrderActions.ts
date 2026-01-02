import { useAppDispatch } from '@/app/store';
import { useMemo } from 'react';
import { newOrderOverlayClosed, newOrderOverlayOpened } from '../newOrderSlice';

export const useNewOrderActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      overlayOpened: () => dispatch(newOrderOverlayOpened()),
      overlayClosed: () => dispatch(newOrderOverlayClosed()),
    }),
    [dispatch],
  );
};
