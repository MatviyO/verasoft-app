import type { Order } from '@/entities/order/types';
import type { RawOrder, RawOrdersResponse } from './types';

export const TABS = [
  { key: 'orders_A', label: 'Orders A' },
  { key: 'orders_AA', label: 'Orders AA' },
  { key: 'orders_AAA', label: 'Orders AAA' },
  { key: 'orders_B', label: 'Orders B' },
  { key: 'orders_C', label: 'Orders C' },
];

const formatDateTime = (dateValue: string, timeValue: string) => {
  const composed = `${dateValue}T${timeValue}`;
  const parsed = new Date(composed);
  if (Number.isNaN(parsed.getTime())) {
    return {
      dateLabel: dateValue,
      timeLabel: timeValue,
      sentAt: 0,
    };
  }

  return {
    dateLabel: parsed.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }),
    timeLabel: parsed.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
    sentAt: parsed.getTime(),
  };
};

const mapOrder = (order: RawOrder, status: 'sent' | 'error'): Order => {
  const { dateLabel, timeLabel, sentAt } = formatDateTime(
    order.sent_dt,
    order.sent_tm,
  );
  return {
    id: `o-${order.id}`,
    date: dateLabel,
    time: timeLabel,
    sentAt,
    subjectTitle: order.subject.title,
    subjectEmail: order.subject.email,
    communicationType: order.type,
    orderNumber: String(order.order_id),
    status,
  };
};

export const getOrdersForTab = (
  data: RawOrdersResponse,
  tab: string,
  filter: 'sent' | 'errors',
) => {
  if (tab === 'Orders AAA') {
    const bucket =
      filter === 'errors'
        ? (data.orders_AAA?.errors ?? [])
        : (data.orders_AAA?.sent ?? []);
    const status = filter === 'errors' ? 'error' : 'sent';
    return bucket.map((order) => mapOrder(order, status));
  }

  const entry = TABS.find((item) => item.label === tab);
  if (!entry) {
    return [];
  }
  const rows =
    data[entry.key as Exclude<keyof RawOrdersResponse, 'orders_AAA'>] ?? [];
  return rows.map((order) => mapOrder(order, 'sent'));
};
