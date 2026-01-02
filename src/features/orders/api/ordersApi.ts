import { httpClient } from '@/shared/api/httpClient';
import { getOrdersForTab, TABS } from './mappers';
import type { OrdersQuery, RawOrdersResponse } from './types';

export const ordersApi = {
  getOrders: async ({ tab, filter }: OrdersQuery) => {
    const response = await httpClient.get<RawOrdersResponse>('/orders.json');
    return {
      tabs: TABS.map((item) => item.label),
      orders: getOrdersForTab(response.data, tab, filter),
    };
  },
};

export type { OrdersPayload, OrdersQuery } from './types';
