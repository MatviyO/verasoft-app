import { httpClient } from '@/shared/api/httpClient'
import type { Order } from '@/entities/order/types'

export type OrdersPayload = {
  orders: Order[]
  tabs: string[]
}

export const ordersApi = {
  getOrders: async () => {
    const response = await httpClient.get<OrdersPayload>('/orders.json')
    return response.data
  },
}
