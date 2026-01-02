import type { Order } from '@/entities/order/types';
import { httpClient } from '@/shared/api/httpClient';

export type OrdersPayload = {
  orders: Order[];
  tabs: string[];
};

export const ordersApi = {
  getOrders: async () => {
    const response = await httpClient.get<OrdersPayload>('/orders.json');
    return response.data;
  },
};
