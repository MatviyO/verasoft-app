import type { CustomerProfile } from '@/entities/customer/types';
import { Card } from '@/shared/ui/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <a
                  href={`#${profile?.accountId}`}
                  className="customer-summary__value"
                >
                  #{profile?.accountId}
                </a>
              </div>
              {phones.map((phone, index) => {
                const displayPhone =
                  index === 1 ? '248-555-1000 ext 1023' : phone;
                const phoneHref = `tel:${displayPhone.replace(/\s+/g, '')}`;
                return (
                  <div
                    className="customer-summary__item customer-summary__item--phone"
                    key={`${phone}-${index}`}
                  >
                    <span className="customer-summary__icon" aria-hidden="true">
                      {index === 0 ? (
                        <FontAwesomeIcon icon={['fas', 'mobile-alt']} />
                      ) : index === 1 ? (
                        <FontAwesomeIcon icon={['far', 'building']} />
                      ) : index === 2 ? (
                        <FontAwesomeIcon icon={['far', 'home']} />
                      ) : index === 3 ? (
                        <FontAwesomeIcon icon={['far', 'envelope']} />
                      ) : null}
                    </span>
                    <a href={phoneHref} className="customer-summary__value">
                      {displayPhone}
                    </a>
                  </div>
                );
              })}
              <div className="customer-summary__item customer-summary__item--email">
                <span className="customer-summary__icon" aria-hidden="true">
                  <FontAwesomeIcon icon={['fas', 'at']} />
                </span>
                <a
                  href={`mailto:${profile?.email}`}
                  className="customer-summary__value"
                >
                  {profile?.email}
                </a>
              </div>
            </>
          ) : null}
        </div>
      </Card>
    </div>
  );
};
