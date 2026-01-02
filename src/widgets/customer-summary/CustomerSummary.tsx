import type { CustomerProfile } from '@/entities/customer/types';
import { Card } from '@/shared/ui/Card/Card';
import './CustomerSummary.scss';
import { CustomerSummaryDetails } from './CustomerSummaryDetails';
import { CustomerSummarySkeleton } from './CustomerSummarySkeleton';

type CustomerSummaryProps = {
  profile?: CustomerProfile | null;
  isLoading?: boolean;
};

export const CustomerSummary = ({
  profile,
  isLoading = false,
}: CustomerSummaryProps) => {
  const showSkeleton = isLoading && !profile;

  return (
    <div className="customer-summary" aria-busy={isLoading}>
      <Card className="customer-summary__profile">
        <div className="customer-summary__avatar" aria-hidden="true">
          <div className="customer-summary__avatar-icon" />
          {showSkeleton ? (
            <div className="customer-summary__meta customer-summary__meta--skeleton" />
          ) : (
            <div className="customer-summary__meta">
              {profile
                ? `${profile.gender.toUpperCase()} - ${profile.age}`
                : ''}
            </div>
          )}
        </div>
      </Card>
      <Card className="customer-summary__details-card">
        <div className="customer-summary__details">
          <CustomerSummarySkeleton showSkeleton={showSkeleton} />
          {profile && !showSkeleton ? (
            <CustomerSummaryDetails profile={profile} />
          ) : null}
        </div>
      </Card>
    </div>
  );
};
