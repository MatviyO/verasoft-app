import type { CustomerProfile } from '@/entities/customer/types';
import { buildCustomerSummaryViewModel } from './model/buildCustomerSummaryViewModel';
import { CustomerSummaryView } from './ui/CustomerSummaryView';

type CustomerSummaryProps = {
  profile?: CustomerProfile | null;
  isLoading?: boolean;
};

export const CustomerSummary = ({
  profile,
  isLoading = false,
}: CustomerSummaryProps) => {
  const summary = buildCustomerSummaryViewModel(profile);

  return <CustomerSummaryView summary={summary} isLoading={isLoading} />;
};
