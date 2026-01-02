import type { CustomerProfile } from '@/entities/customer/types';
import type { CustomerSummaryPhone, CustomerSummaryViewModel } from './types';

const PHONE_ICON_BY_INDEX: Array<CustomerSummaryPhone['icon']> = [
  ['fas', 'mobile-alt'],
  ['far', 'building'],
  ['far', 'home'],
  ['far', 'envelope'],
];

const getPhoneDisplay = (phone: string, index: number) =>
  index === 1 ? '248-555-1000 ext 1023' : phone;

const buildPhoneEntry = (
  phone: string,
  index: number,
): CustomerSummaryPhone => {
  const display = getPhoneDisplay(phone, index);

  return {
    id: `${phone}-${index}`,
    display,
    href: `tel:${display.replace(/\s+/g, '')}`,
    icon: PHONE_ICON_BY_INDEX[index] ?? null,
  };
};

export const buildCustomerSummaryViewModel = (
  profile?: CustomerProfile | null,
): CustomerSummaryViewModel | null => {
  if (!profile) {
    return null;
  }

  return {
    metaText: `${profile.gender.toUpperCase()} - ${profile.age}`,
    accountId: profile.accountId,
    email: profile.email,
    phones: (profile.phones ?? []).map(buildPhoneEntry),
  };
};
