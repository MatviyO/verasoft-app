import type { Order } from '@/entities/order/types';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { TabList } from '@/shared/ui/Tabs/TabList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './OrdersSection.scss';

type OrdersSectionProps = {
  tabs: string[];
  activeTab: string;
  filter: 'sent' | 'errors';
  orders: Order[];
  isLoading: boolean;
  sortKey: 'date' | 'subject' | 'type' | 'orderNumber';
  sortDirection: 'asc' | 'desc';
  onTabChange: (tab: string) => void;
  onFilterChange: (filter: 'sent' | 'errors') => void;
  onSortChange: (key: 'date' | 'subject' | 'type' | 'orderNumber') => void;
};

export const OrdersSection = ({
  tabs,
  activeTab,
  filter,
  orders,
  isLoading,
  onTabChange,
  onFilterChange,
  onSortChange,
}: OrdersSectionProps) => {
  const isSent = filter === 'sent';
  const isErrors = filter === 'errors';
  const isEmpty = !isLoading && orders.length === 0;
  const showSubTabs = activeTab === 'Orders AAA';
  const showTableContent = !isLoading;
  const showLoadingOverlay = false; // Always use inline loader like in errors tab

  return (
    <section className="orders-section">
      <div className="orders-section__tabs">
        <TabList tabs={tabs} active={activeTab} onChange={onTabChange} />
      </div>
      <Card className="orders-section__table" aria-busy={isLoading}>
        <div className="orders-section__header">
          <div className="orders-section__filters">
            {showSubTabs ? (
              <>
                <button
                  className={`orders-section__filter ${
                    isSent ? 'is-active' : ''
                  }`.trim()}
                  onClick={() => onFilterChange('sent')}
                  type="button"
                >
                  <span className="orders-section__filter-label">Sent</span>
                </button>
                <button
                  className={`orders-section__filter ${
                    isErrors ? 'is-active' : ''
                  }`.trim()}
                  onClick={() => onFilterChange('errors')}
                  type="button"
                >
                  <span className="orders-section__filter-label">Errors</span>
                </button>
              </>
            ) : null}
          </div>
          <div className="orders-section__title">Recent Orders</div>
          <div className="orders-section__spacer" aria-hidden="true" />
        </div>
        {showTableContent ? (
          <>
            {!isEmpty ? (
              <div className="orders-section__columns" role="row">
                <button
                  className="orders-section__column-button"
                  type="button"
                  onClick={() => onSortChange('date')}
                  aria-label="Sort by date"
                >
                  Date &amp; Time
                </button>
                <button
                  className="orders-section__column-button"
                  type="button"
                  onClick={() => onSortChange('subject')}
                  aria-label="Sort by subject"
                >
                  Subject
                </button>
                <button
                  className="orders-section__column-button"
                  type="button"
                  onClick={() => onSortChange('type')}
                  aria-label="Sort by communication type"
                >
                  Communication Type
                </button>
                <button
                  className="orders-section__column-button"
                  type="button"
                  onClick={() => onSortChange('orderNumber')}
                  aria-label="Sort by order number"
                >
                  Order #
                </button>
                <span
                  className="orders-section__column-spacer"
                  aria-hidden="true"
                />
              </div>
            ) : null}
            <div
              className={`orders-section__rows ${
                isEmpty || (isLoading && orders.length === 0)
                  ? 'orders-section__rows--empty'
                  : isLoading && orders.length > 0
                    ? 'orders-section__rows--loading'
                    : ''
              }`.trim()}
            >
              {orders.length === 0 && !isLoading ? (
                <div className="orders-section__empty">No Items</div>
              ) : isLoading && orders.length > 0 ? (
                <span
                  className="orders-section__inline-loader"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </span>
              ) : (
                orders.map((order) => (
                  <div className="orders-section__row" key={order.id}>
                    <div className="orders-section__cell">
                      <div className="orders-section__date orders-section__text">
                        {order.date}
                      </div>
                      <div className="orders-section__time orders-section__text">
                        {order.time}
                      </div>
                    </div>
                    <div className="orders-section__cell">
                      <div className="orders-section__subject orders-section__text">
                        {order.subjectTitle}
                      </div>
                      <div className="orders-section__contact orders-section__text">
                        {order.subjectEmail}
                      </div>
                    </div>
                    <div className="orders-section__cell orders-section__text orders-section__type">
                      {order.communicationType}
                    </div>
                    <div className="orders-section__cell orders-section__text orders-section__order-number">
                      {order.orderNumber}
                    </div>
                    <div className="orders-section__cell">
                      <Button
                        className="orders-section__resend"
                        size="sm"
                        variant="ghost"
                      >
                        Resend
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="orders-section__rows orders-section__rows--loading">
            {!showLoadingOverlay ? (
              <span
                className="orders-section__inline-loader"
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
              </span>
            ) : null}
          </div>
        )}
        {showLoadingOverlay ? (
          <div
            className="orders-section__overlay"
            role="status"
            aria-label="Loading"
          >
            <div className="orders-section__overlay-content">
              <span
                className="orders-section__overlay-loader"
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
              </span>
            </div>
          </div>
        ) : null}
      </Card>
    </section>
  );
};
