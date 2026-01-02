import type {
  CarrierStatus,
  CommunicationStats,
} from '@/entities/customer/types';
import { Card } from '@/shared/ui/Card/Card';
import { StatTile } from '@/shared/ui/StatTile/StatTile';
import './ActivitySummary.scss';

type ActivitySummaryProps = {
  stats?: CommunicationStats | null;
  carrier?: CarrierStatus | null;
  isLoading?: boolean;
};

export const ActivitySummary = ({
  stats,
  carrier,
  isLoading = false,
}: ActivitySummaryProps) => {
  const showSkeleton = isLoading && (!stats || !carrier);

  return (
    <div className="activity-summary" aria-busy={isLoading}>
      <Card className="activity-summary__activity">
        <div className="activity-summary__title">
          90-day communication activity
        </div>
        {showSkeleton ? (
          <div className="activity-summary__stats activity-summary__stats--skeleton">
            <div className="activity-summary__stat-skeleton" />
            <div className="activity-summary__stat-skeleton" />
            <div className="activity-summary__stat-skeleton" />
          </div>
        ) : (
          <div className="activity-summary__stats">
            <StatTile label="SMS" value={stats?.sms ?? 0} />
            <StatTile label="Email" value={stats?.email ?? 0} />
            <StatTile label="Orders" value={stats?.orders ?? 0} />
          </div>
        )}
      </Card>
      <Card className="activity-summary__carrier">
        <div className="activity-summary__title">SMS carrier status</div>
        {showSkeleton ? (
          <>
            <div className="activity-summary__carrier-status activity-summary__carrier-status--skeleton" />
            <div className="activity-summary__carrier-date activity-summary__carrier-date--skeleton" />
          </>
        ) : (
          <>
            <div className="activity-summary__carrier-status">
              {carrier?.status}
            </div>
            <div className="activity-summary__carrier-date">
              Since {carrier?.since}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
