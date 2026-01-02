import type {
  CarrierStatus,
  CommunicationStats,
  CustomerProfile,
} from '@/entities/customer/types';
import { httpClient } from '@/shared/api/httpClient';

export type CustomerPayload = {
  profile: CustomerProfile;
  stats: CommunicationStats;
  carrier: CarrierStatus;
};

export const customerApi = {
  getCustomer: async () => {
    const response = await httpClient.get<CustomerPayload>('/customer.json');
    return response.data;
  },
};
