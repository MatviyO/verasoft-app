import type { CustomerProfile } from '@/entities/customer/types';
import { Card } from '@/shared/ui/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CustomerSummary.scss';

const SKELETON_ITEM_VARIANTS = ['id', 'phone', 'phone', 'email'] as const;
const PHONE_ICON_BY_INDEX = [
  ['fas', 'mobile-alt'],
  ['far', 'building'],
  ['far', 'home'],
  ['far', 'envelope'],
] as const;

type CustomerSummaryProps = {
  profile?: CustomerProfile | null;
  isLoading?: boolean;
};

type PhoneIconDefinition = (typeof PHONE_ICON_BY_INDEX)[number];

const getPhoneIcon = (index: number): PhoneIconDefinition | null =>
  PHONE_ICON_BY_INDEX[index] ?? null;

const getPhoneDisplay = (phone: string, index: number) =>
  index === 1 ? '248-555-1000 ext 1023' : phone;

type CustomerSummarySkeletonProps = {
  showSkeleton: boolean;
};

const CustomerSummarySkeleton = ({
  showSkeleton,
}: CustomerSummarySkeletonProps) => {
  if (!showSkeleton) {
    return null;
  }

  return (
    <>
      {SKELETON_ITEM_VARIANTS.map((variant, index) => (
        <div
          className={`customer-summary__item customer-summary__item--${variant}`}
          key={`${variant}-${index}`}
        >
          <span className="customer-summary__value customer-summary__value--skeleton" />
        </div>
      ))}
    </>
  );
};

type CustomerSummaryDetailsProps = {
  profile: CustomerProfile;
};

const CustomerSummaryDetails = ({ profile }: CustomerSummaryDetailsProps) => {
  const phones = profile.phones ?? [];
  const accountId = profile.accountId;
  const email = profile.email;

  return (
    <>
      <div className="customer-summary__item customer-summary__item--id">
        <a href={`#${accountId}`} className="customer-summary__value">
          #{accountId}
        </a>
      </div>
      {phones.map((phone, index) => {
        const displayPhone = getPhoneDisplay(phone, index);
        const phoneHref = `tel:${displayPhone.replace(/\s+/g, '')}`;
        const icon = getPhoneIcon(index);

        return (
          <div
            className="customer-summary__item customer-summary__item--phone"
            key={`${phone}-${index}`}
          >
            <span className="customer-summary__icon" aria-hidden="true">
              {icon ? <FontAwesomeIcon icon={icon} /> : null}
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
        <a href={`mailto:${email}`} className="customer-summary__value">
          {email}
        </a>
      </div>
    </>
  );
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
