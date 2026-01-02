import { useAppDispatch } from '@/app/store';
import { useMemo } from 'react';
import { customerRequested } from '../customerSlice';

export const useCustomerActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      requested: () => dispatch(customerRequested()),
    }),
    [dispatch],
  );
};
