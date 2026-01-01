import type { CustomerProfile } from '@/entities/customer/types'
import { Card } from '@/shared/ui/Card/Card'
import './CustomerSummary.css'

type CustomerSummaryProps = {
  profile: CustomerProfile
}

export const CustomerSummary = ({ profile }: CustomerSummaryProps) => (
  <Card className="customer-summary">
    <div className="customer-summary__avatar" aria-hidden="true">
      <div className="customer-summary__avatar-icon" />
      <div className="customer-summary__meta">
        {profile.gender.toUpperCase()} - {profile.age}
      </div>
    </div>
    <div className="customer-summary__details">
      <div className="customer-summary__item">
        <span className="customer-summary__label">ID</span>
        <span>#{profile.accountId}</span>
      </div>
      {profile.phones.map((phone, index) => (
        <div className="customer-summary__item" key={`${phone}-${index}`}>
          <span className="customer-summary__label">Phone</span>
          <span>{phone}</span>
        </div>
      ))}
      <div className="customer-summary__item">
        <span className="customer-summary__label">Email</span>
        <span>{profile.email}</span>
      </div>
    </div>
  </Card>
)
