import type { CustomerProfile } from '@/entities/customer/types';
import { Card } from '@/shared/ui/Card/Card';
import './CustomerSummary.scss';

type CustomerSummaryProps = {
  profile?: CustomerProfile | null;
  isLoading?: boolean;
};

export const CustomerSummary = ({
  profile,
  isLoading = false,
}: CustomerSummaryProps) => {
  const showSkeleton = isLoading && !profile;
  const phones = profile?.phones ?? [];

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
          {showSkeleton ? (
            <>
              <div className="customer-summary__item customer-summary__item--id">
                <span className="customer-summary__value customer-summary__value--skeleton" />
              </div>
              <div className="customer-summary__item customer-summary__item--phone">
                <span className="customer-summary__value customer-summary__value--skeleton" />
              </div>
              <div className="customer-summary__item customer-summary__item--phone">
                <span className="customer-summary__value customer-summary__value--skeleton" />
              </div>
              <div className="customer-summary__item customer-summary__item--email">
                <span className="customer-summary__value customer-summary__value--skeleton" />
              </div>
            </>
          ) : profile ? (
            <>
              <div className="customer-summary__item customer-summary__item--id">
                <span className="customer-summary__value">
                  #{profile?.accountId}
                </span>
              </div>
              {phones.map((phone, index) => (
                <div
                  className="customer-summary__item customer-summary__item--phone"
                  key={`${phone}-${index}`}
                >
                  <span className="customer-summary__value">{phone}</span>
                </div>
              ))}
              <div className="customer-summary__item customer-summary__item--email">
                <span className="customer-summary__value">
                  {profile?.email}
                </span>
              </div>
            </>
          ) : null}
        </div>
      </Card>
    </div>
  );
};
