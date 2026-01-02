import { useAppSelector } from '@/app/store';
import { useCustomerActions } from '@/features/customer/hooks/useCustomerActions';
import { useNewOrderActions } from '@/features/new-order/hooks/useNewOrderActions';
import { useOrdersActions } from '@/features/orders/hooks/useOrdersActions';
import { useEffect, useMemo } from 'react';

export const useCustomerPageViewModel = () => {
  const customer = useAppSelector((state) => state.customer);
  const newOrderOverlayOpen = useAppSelector(
    (state) => state.newOrder.overlayOpen,
  );
  const orders = useAppSelector((state) => state.orders);
  const customerActions = useCustomerActions();
  const newOrderActions = useNewOrderActions();
  const ordersActions = useOrdersActions();

  const isSummaryLoading = customer.status === 'loading';
  const isOrdersLoading = orders.status === 'loading';

  useEffect(() => {
    if (customer.status === 'idle') {
      customerActions.requested();
    }
  }, [customer.status, customerActions]);

  useEffect(() => {
    if (orders.status === 'idle') {
      ordersActions.requested();
    }
  }, [orders.status, ordersActions]);

  const sortedOrders = useMemo(() => {
    const direction = orders.sortDirection === 'asc' ? 1 : -1;
    return [...orders.orders].sort((a, b) => {
      switch (orders.sortKey) {
        case 'date':
          return (a.sentAt - b.sentAt) * direction;
        case 'subject':
          return a.subjectTitle.localeCompare(b.subjectTitle) * direction;
        case 'type':
          return (
            a.communicationType.localeCompare(b.communicationType) * direction
          );
        case 'orderNumber':
          return (
            ((Number(a.orderNumber) || 0) - (Number(b.orderNumber) || 0)) *
            direction
          );
        default:
          return 0;
      }
    });
  }, [orders.orders, orders.sortDirection, orders.sortKey]);

  const errorNotices = [
    customer.status === 'error'
      ? (customer.error ?? 'Failed to load customer.')
      : null,
    orders.status === 'error'
      ? (orders.error ?? 'Failed to load orders.')
      : null,
  ].filter((message): message is string => Boolean(message));

  const handleTabChange = (tab: string) => {
    ordersActions.tabChanged(tab);
    ordersActions.requested({ delayMs: 1000 });
  };

  const handleFilterChange = (filter: 'sent' | 'errors') => {
    ordersActions.filterChanged(filter);
    ordersActions.requested();
  };

  const handleSortChange = (
    key: 'date' | 'subject' | 'type' | 'orderNumber',
  ) => {
    ordersActions.sortChanged(key);
  };

  const handleNewOrder = () => {
    newOrderActions.overlayOpened();
  };

  const handleOverlayClose = () => {
    newOrderActions.overlayClosed();
  };

  return {
    customer,
    orders,
    sortedOrders,
    errorNotices,
    isSummaryLoading,
    isOrdersLoading,
    newOrderOverlayOpen,
    handleTabChange,
    handleFilterChange,
    handleSortChange,
    handleNewOrder,
    handleOverlayClose,
  };
};
