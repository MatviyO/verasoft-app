const SKELETON_ITEM_VARIANTS = ['id', 'phone', 'phone', 'email'] as const;

type CustomerSummarySkeletonProps = {
  showSkeleton: boolean;
};

export const CustomerSummarySkeleton = ({
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
