import { useAppDispatch, useAppSelector } from '@/app/store';
import { customerRequested } from '@/features/customer/customerSlice';
import {
  newOrderOverlayClosed,
  newOrderOverlayOpened,
} from '@/features/new-order/newOrderSlice';
import {
  ordersFilterChanged,
  ordersRequested,
  ordersSortChanged,
  ordersTabChanged,
} from '@/features/orders/ordersSlice';
import { DotsLoader } from '@/shared/ui/Loader/DotsLoader';
import { ActivitySummary } from '@/widgets/activity-summary/ActivitySummary';
import { CustomerSummary } from '@/widgets/customer-summary/CustomerSummary';
import { Header } from '@/widgets/header/Header';
import { NewOrderOverlay } from '@/widgets/new-order-overlay/NewOrderOverlay';
import { OrdersSection } from '@/widgets/orders-section/OrdersSection';
import { useEffect } from 'react';
import './CustomerPage.scss';

export const CustomerPage = () => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customer);
  const newOrderOverlayOpen = useAppSelector(
    (state) => state.newOrder.overlayOpen,
  );
  const orders = useAppSelector((state) => state.orders);
  const visibleOrders = orders.orders;
  const isSummaryLoading = customer.status === 'loading';
  const isOrdersLoading = orders.status === 'loading';

  useEffect(() => {
    if (customer.status === 'idle') {
      dispatch(customerRequested());
    }
  }, [customer.status, dispatch]);

  useEffect(() => {
    if (orders.status === 'idle') {
      dispatch(ordersRequested());
    }
  }, [orders.status, dispatch]);

  const sortedOrders = [...visibleOrders].sort((a, b) => {
    const direction = orders.sortDirection === 'asc' ? 1 : -1;
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

  return (
    <div className="customer-page">
      <div
        className={`customer-page__content${newOrderOverlayOpen ? 'customer-page__content--blurred' : ''}`}
      >
        <Header
          title={customer.profile?.name ?? 'Customer'}
          onNewOrder={() => dispatch(newOrderOverlayOpened())}
        />
        <div className="customer-page__notice-stack">
          {customer.status === 'loading' ? (
            <div className="customer-page__notice">Loading data…</div>
          ) : null}
          {customer.status === 'error' ? (
            <div className="customer-page__notice customer-page__notice--error">
              {customer.error ?? 'Failed to load customer.'}
            </div>
          ) : null}
          {orders.status === 'error' ? (
            <div className="customer-page__notice customer-page__notice--error">
              {orders.error ?? 'Failed to load orders.'}
            </div>
          ) : null}
        </div>
        <div className="customer-page__summary">
          <CustomerSummary
            profile={customer.profile}
            isLoading={isSummaryLoading}
          />
          <ActivitySummary
            stats={customer.stats}
            carrier={customer.carrier}
            isLoading={isSummaryLoading}
          />
          {isSummaryLoading ? (
            <div className="customer-page__summary-overlay" role="status">
              <div className="customer-page__summary-overlay-content">
                <DotsLoader />
                <div className="customer-page__summary-overlay-text">
                  Loading customer summary
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <OrdersSection
          tabs={orders.tabs}
          activeTab={orders.activeTab}
          filter={orders.filter}
          orders={sortedOrders}
          isLoading={isOrdersLoading}
          sortKey={orders.sortKey}
          sortDirection={orders.sortDirection}
          onTabChange={(tab) => {
            dispatch(ordersTabChanged(tab));
            dispatch(ordersRequested({ delayMs: 1000 }));
          }}
          onFilterChange={(filter) => {
            dispatch(ordersFilterChanged(filter));
            dispatch(ordersRequested());
          }}
          onSortChange={(key) => dispatch(ordersSortChanged(key))}
        />
      </div>
      {newOrderOverlayOpen ? (
        <NewOrderOverlay onClose={() => dispatch(newOrderOverlayClosed())} />
      ) : null}
    </div>
  );
};
