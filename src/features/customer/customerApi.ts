import type {
  CarrierStatus,
  CommunicationStats,
  CustomerProfile,
} from '@/entities/customer/types';
import { httpClient } from '@/shared/api/httpClient';

type CustomerSummaryResponse = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  home_phone: string;
  mobile_phone: string;
  work_phone: string;
  email: string;
  activity: CommunicationStats;
  carrier_status: {
    since: string;
    status: string;
  };
};

export type CustomerPayload = {
  profile: CustomerProfile;
  stats: CommunicationStats;
  carrier: CarrierStatus;
};

const formatTitleCase = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value;

const formatCarrierSince = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const calculateAge = (birthDate: string) => {
  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) {
    return 0;
  }
  const today = new Date();
  let age = today.getFullYear() - parsed.getFullYear();
  const monthDelta = today.getMonth() - parsed.getMonth();
  if (
    monthDelta < 0 ||
    (monthDelta === 0 && today.getDate() < parsed.getDate())
  ) {
    age -= 1;
  }
  return age;
};

const mapCustomerSummary = (
  payload: CustomerSummaryResponse,
): CustomerPayload => ({
  profile: {
    id: `c-${payload.id}`,
    name: `${payload.first_name} ${payload.last_name}`,
    gender: formatTitleCase(payload.gender),
    age: calculateAge(payload.birth_date),
    email: payload.email,
    phones: [
      payload.home_phone,
      payload.work_phone,
      payload.mobile_phone,
    ].filter(Boolean),
    accountId: String(payload.id),
  },
  stats: payload.activity,
  carrier: {
    status: payload.carrier_status.status,
    since: formatCarrierSince(payload.carrier_status.since),
  },
});

export const customerApi = {
  getCustomer: async () => {
    const response =
      await httpClient.get<CustomerSummaryResponse>('/summary.json');
    return mapCustomerSummary(response.data);
  },
};
