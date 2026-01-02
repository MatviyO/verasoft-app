import { Card } from '@/shared/ui/Card/Card';
import type { CustomerSummaryViewModel } from '../model/types';
import './CustomerSummary.scss';
import { CustomerSummaryDetails } from './CustomerSummaryDetails';
import { CustomerSummarySkeleton } from './CustomerSummarySkeleton';

type CustomerSummaryViewProps = {
  summary?: CustomerSummaryViewModel | null;
  isLoading?: boolean;
};

export const CustomerSummaryView = ({
  summary,
  isLoading = false,
}: CustomerSummaryViewProps) => {
  const showSkeleton = isLoading && !summary;

  return (
    <div className="customer-summary" aria-busy={isLoading}>
      <Card className="customer-summary__profile">
        <div className="customer-summary__avatar" aria-hidden="true">
          <div className="customer-summary__avatar-icon">
            <span className="customer-summary__avatar-icon-image" />
          </div>
          {showSkeleton ? (
            <div className="customer-summary__meta customer-summary__meta--skeleton" />
          ) : (
            <div className="customer-summary__meta">
              {summary ? summary.metaText : ''}
            </div>
          )}
        </div>
      </Card>
      <Card className="customer-summary__details-card">
        <div className="customer-summary__details">
          <CustomerSummarySkeleton showSkeleton={showSkeleton} />
          {summary && !showSkeleton && (
            <CustomerSummaryDetails summary={summary} />
          )}
        </div>
      </Card>
    </div>
  );
};
