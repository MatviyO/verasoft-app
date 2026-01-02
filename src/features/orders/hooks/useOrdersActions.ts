import { useAppDispatch } from '@/app/store';
import { useMemo } from 'react';
import {
  ordersFilterChanged,
  ordersRequested,
  ordersSortChanged,
  ordersTabChanged,
} from '../ordersSlice';

export const useOrdersActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      tabChanged: (tab: string) => dispatch(ordersTabChanged(tab)),
      filterChanged: (filter: 'sent' | 'errors') =>
        dispatch(ordersFilterChanged(filter)),
      sortChanged: (key: 'date' | 'subject' | 'type' | 'orderNumber') =>
        dispatch(ordersSortChanged(key)),
      requested: (payload?: { delayMs?: number }) =>
        dispatch(ordersRequested(payload)),
    }),
    [dispatch],
  );
};
