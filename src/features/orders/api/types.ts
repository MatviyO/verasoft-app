import type { Order } from '@/entities/order/types';

export type RawOrder = {
  id: number;
  order_id: number;
  sent_dt: string;
  sent_tm: string;
  subject: {
    title: string;
    email: string;
  };
  type: string;
};

export type RawOrdersResponse = {
  orders_A: RawOrder[];
  orders_AA: RawOrder[];
  orders_AAA?: {
    sent?: RawOrder[];
    errors?: RawOrder[];
  };
  orders_B: RawOrder[];
  orders_C: RawOrder[];
};

export type OrdersQuery = {
  tab: string;
  filter: 'sent' | 'errors';
};

export type OrdersPayload = {
  orders: Order[];
  tabs: string[];
};
