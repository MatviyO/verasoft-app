import type { Order } from '@/entities/order/types';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { TabList } from '@/shared/ui/Tabs/TabList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './OrdersSection.scss';

const FILTER_OPTIONS = [
  { value: 'sent', label: 'Sent' },
  { value: 'errors', label: 'Errors' },
] as const;

const COLUMN_OPTIONS = [
  { key: 'date', label: 'Date & Time', ariaLabel: 'Sort by date' },
  { key: 'subject', label: 'Subject', ariaLabel: 'Sort by subject' },
  {
    key: 'type',
    label: 'Communication Type',
    ariaLabel: 'Sort by communication type',
  },
  { key: 'orderNumber', label: 'Order #', ariaLabel: 'Sort by order number' },
] as const;

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

type OrdersFilterValue = OrdersSectionProps['filter'];
type OrdersSortKey = OrdersSectionProps['sortKey'];

type InlineLoaderProps = {
  className?: string;
};

const InlineLoader = ({ className }: InlineLoaderProps) => (
  <span className={className} aria-hidden="true">
    <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
  </span>
);

type OrdersFiltersProps = {
  isVisible: boolean;
  activeFilter: OrdersFilterValue;
  onChange: (filter: OrdersFilterValue) => void;
};

const OrdersFilters = ({
  isVisible,
  activeFilter,
  onChange,
}: OrdersFiltersProps) => (
  <div className="orders-section__filters">
    {isVisible
      ? FILTER_OPTIONS.map((option) => (
          <button
            className={`orders-section__filter ${
              activeFilter === option.value ? 'is-active' : ''
            }`.trim()}
            onClick={() => onChange(option.value)}
            type="button"
            key={option.value}
          >
            <span className="orders-section__filter-label">{option.label}</span>
          </button>
        ))
      : null}
  </div>
);

type OrdersColumnsProps = {
  isVisible: boolean;
  onSortChange: (key: OrdersSortKey) => void;
};

const OrdersColumns = ({ isVisible, onSortChange }: OrdersColumnsProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="orders-section__columns" role="row">
      {COLUMN_OPTIONS.map((column) => (
        <button
          className="orders-section__column-button"
          type="button"
          onClick={() => onSortChange(column.key)}
          aria-label={column.ariaLabel}
          key={column.key}
        >
          {column.label}
        </button>
      ))}
      <span className="orders-section__column-spacer" aria-hidden="true" />
    </div>
  );
};

type OrderRowProps = {
  order: Order;
};

const OrderRow = ({ order }: OrderRowProps) => (
  <div className="orders-section__row">
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
      <Button className="orders-section__resend" size="sm" variant="ghost">
        Resend
      </Button>
    </div>
  </div>
);

type OrdersRowsProps = {
  orders: Order[];
  isLoading: boolean;
  isEmpty: boolean;
};

const OrdersRows = ({ orders, isLoading, isEmpty }: OrdersRowsProps) => {
  const hasOrders = orders.length > 0;
  const rowsClassName = [
    'orders-section__rows',
    isEmpty || (isLoading && !hasOrders) ? 'orders-section__rows--empty' : '',
    isLoading && hasOrders ? 'orders-section__rows--loading' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowsClassName}>
      {isEmpty ? (
        <div className="orders-section__empty">No Items</div>
      ) : isLoading && hasOrders ? (
        <InlineLoader className="orders-section__inline-loader" />
      ) : (
        orders.map((order) => <OrderRow key={order.id} order={order} />)
      )}
    </div>
  );
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
          <OrdersFilters
            isVisible={showSubTabs}
            activeFilter={filter}
            onChange={onFilterChange}
          />
          <div className="orders-section__title">Recent Orders</div>
          <div className="orders-section__spacer" aria-hidden="true" />
        </div>
        {showTableContent ? (
          <>
            <OrdersColumns isVisible={!isEmpty} onSortChange={onSortChange} />
            <OrdersRows
              orders={orders}
              isLoading={isLoading}
              isEmpty={isEmpty}
            />
          </>
        ) : (
          <div className="orders-section__rows orders-section__rows--loading">
            {!showLoadingOverlay ? (
              <InlineLoader className="orders-section__inline-loader" />
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
              <InlineLoader className="orders-section__overlay-loader" />
            </div>
          </div>
        ) : null}
      </Card>
    </section>
  );
};
