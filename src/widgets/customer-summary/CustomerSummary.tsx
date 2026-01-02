import type { CustomerProfile } from '@/entities/customer/types';
import { Card } from '@/shared/ui/Card/Card';
import './CustomerSummary.scss';

type CustomerSummaryProps = {
  profile: CustomerProfile;
};

export const CustomerSummary = ({ profile }: CustomerSummaryProps) => (
  <div className="customer-summary">
    <Card className="customer-summary__profile">
      <div className="customer-summary__avatar" aria-hidden="true">
        <div className="customer-summary__avatar-icon" />
        <div className="customer-summary__meta">
          {profile.gender.toUpperCase()} - {profile.age}
        </div>
      </div>
    </Card>
    <Card className="customer-summary__details-card">
      <div className="customer-summary__details">
        <div className="customer-summary__item customer-summary__item--id">
          <span className="customer-summary__value">#{profile.accountId}</span>
        </div>
        {profile.phones.map((phone, index) => (
          <div
            className="customer-summary__item customer-summary__item--phone"
            key={`${phone}-${index}`}
          >
            <span className="customer-summary__value">{phone}</span>
          </div>
        ))}
        <div className="customer-summary__item customer-summary__item--email">
          <span className="customer-summary__value">{profile.email}</span>
        </div>
      </div>
    </Card>
  </div>
);
