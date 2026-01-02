import type { Order } from '@/entities/order/types';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { DotsLoader } from '@/shared/ui/Loader/DotsLoader';
import { TabList } from '@/shared/ui/Tabs/TabList';
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
  sortKey,
  sortDirection,
  onTabChange,
  onFilterChange,
  onSortChange,
}: OrdersSectionProps) => {
  const isSent = filter === 'sent';
  const isErrors = filter === 'errors';
  const isEmpty = !isLoading && orders.length === 0;
  const showSubTabs = activeTab === 'Orders AAA';

  const getSortIndicator = (key: OrdersSectionProps['sortKey']) =>
    sortKey === key ? (sortDirection === 'asc' ? 'ASC' : 'DESC') : '';

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
        <div className="orders-section__columns" role="row">
          <button
            className={`orders-section__column-button ${
              sortKey === 'date' ? 'is-sorted' : ''
            }`.trim()}
            type="button"
            onClick={() => onSortChange('date')}
            aria-label="Sort by date"
          >
            Date &amp; Time
            <span className="orders-section__sort-indicator">
              {getSortIndicator('date')}
            </span>
          </button>
          <button
            className={`orders-section__column-button ${
              sortKey === 'subject' ? 'is-sorted' : ''
            }`.trim()}
            type="button"
            onClick={() => onSortChange('subject')}
            aria-label="Sort by subject"
          >
            Subject
            <span className="orders-section__sort-indicator">
              {getSortIndicator('subject')}
            </span>
          </button>
          <button
            className={`orders-section__column-button ${
              sortKey === 'type' ? 'is-sorted' : ''
            }`.trim()}
            type="button"
            onClick={() => onSortChange('type')}
            aria-label="Sort by communication type"
          >
            Communication Type
            <span className="orders-section__sort-indicator">
              {getSortIndicator('type')}
            </span>
          </button>
          <button
            className={`orders-section__column-button ${
              sortKey === 'orderNumber' ? 'is-sorted' : ''
            }`.trim()}
            type="button"
            onClick={() => onSortChange('orderNumber')}
            aria-label="Sort by order number"
          >
            Order #
            <span className="orders-section__sort-indicator">
              {getSortIndicator('orderNumber')}
            </span>
          </button>
          <span className="orders-section__column-spacer" aria-hidden="true" />
        </div>
        <div
          className={`orders-section__rows ${
            isEmpty || (isLoading && orders.length === 0)
              ? 'orders-section__rows--empty'
              : ''
          }`.trim()}
        >
          {orders.length === 0 && !isLoading ? (
            <div className="orders-section__empty">No Items</div>
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
        {isLoading ? (
          <div className="orders-section__overlay" role="status">
            <div className="orders-section__overlay-content">
              <DotsLoader />
              <div className="orders-section__overlay-text">Loading orders</div>
            </div>
          </div>
        ) : null}
      </Card>
    </section>
  );
};
