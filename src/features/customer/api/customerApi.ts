import { httpClient } from '@/shared/api/httpClient';
import { mapCustomerSummary } from './mappers';
import type { CustomerSummaryResponse } from './types';

export const customerApi = {
  getCustomer: async () => {
    const response =
      await httpClient.get<CustomerSummaryResponse>('/summary.json');
    return mapCustomerSummary(response.data);
  },
};

export type { CustomerPayload } from './types';
