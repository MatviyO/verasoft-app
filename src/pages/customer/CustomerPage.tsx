import { DotsLoader } from '@/shared/ui/Loader/DotsLoader';
import { ActivitySummary } from '@/widgets/activity-summary/ActivitySummary';
import { CustomerSummary } from '@/widgets/customer-summary';
import { Header } from '@/widgets/header/Header';
import { NewOrderOverlay } from '@/widgets/new-order-overlay/NewOrderOverlay';
import { OrdersSection } from '@/widgets/orders-section/OrdersSection';
import './CustomerPage.scss';
import { useCustomerPageViewModel } from './hooks/useCustomerPageViewModel';

export const CustomerPage = () => {
  const {
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
  } = useCustomerPageViewModel();

  return (
    <div className="customer-page">
      <div
        className={`customer-page__content${newOrderOverlayOpen ? 'customer-page__content--blurred' : ''}`}
      >
        <Header
          title={customer.profile?.name ?? 'Customer'}
          onNewOrder={handleNewOrder}
        />
        <div className="customer-page__notice-stack">
          {customer.status === 'loading' && (
            <div className="customer-page__notice">Loading data…</div>
          )}
          {errorNotices.map((message, index) => (
            <div
              key={`${message}-${index}`}
              className="customer-page__notice customer-page__notice--error"
            >
              {message}
            </div>
          ))}
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
          {isSummaryLoading && (
            <div className="customer-page__summary-overlay" role="status">
              <div className="customer-page__summary-overlay-content">
                <DotsLoader />
                <div className="customer-page__summary-overlay-text">
                  Loading customer summary
                </div>
              </div>
            </div>
          )}
        </div>
        <OrdersSection
          tabs={orders.tabs}
          activeTab={orders.activeTab}
          filter={orders.filter}
          orders={sortedOrders}
          isLoading={isOrdersLoading}
          sortKey={orders.sortKey}
          sortDirection={orders.sortDirection}
          onTabChange={handleTabChange}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>
      {newOrderOverlayOpen && <NewOrderOverlay onClose={handleOverlayClose} />}
    </div>
  );
};
