import type {
  CarrierStatus,
  CommunicationStats,
  CustomerProfile,
} from '@/entities/customer/types';

export type CustomerSummaryResponse = {
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
