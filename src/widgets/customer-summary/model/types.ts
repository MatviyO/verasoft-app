import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export type CustomerSummaryPhone = {
  id: string;
  display: string;
  href: string;
  icon: [IconPrefix, IconName] | null;
};

export type CustomerSummaryViewModel = {
  metaText: string;
  accountId: string;
  email: string;
  phones: CustomerSummaryPhone[];
};
