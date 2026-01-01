import type {
  CarrierStatus,
  CommunicationStats,
} from '@/entities/customer/types'
import { Card } from '@/shared/ui/Card/Card'
import { StatTile } from '@/shared/ui/StatTile/StatTile'
import './ActivitySummary.css'

type ActivitySummaryProps = {
  stats: CommunicationStats
  carrier: CarrierStatus
}

export const ActivitySummary = ({ stats, carrier }: ActivitySummaryProps) => (
  <div className="activity-summary">
    <Card className="activity-summary__activity">
      <div className="activity-summary__title">
        90-day communication activity
      </div>
      <div className="activity-summary__stats">
        <StatTile label="SMS" value={stats.sms} />
        <StatTile label="Email" value={stats.email} />
        <StatTile label="Orders" value={stats.orders} />
      </div>
    </Card>
    <Card className="activity-summary__carrier">
      <div className="activity-summary__title">SMS carrier status</div>
      <div className="activity-summary__carrier-status">{carrier.status}</div>
      <div className="activity-summary__carrier-date">
        Since {carrier.since}
      </div>
    </Card>
  </div>
)
