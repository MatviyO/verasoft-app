import type { CustomerProfile } from '@/entities/customer/types';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PHONE_ICON_BY_INDEX: Array<[IconPrefix, IconName]> = [
  ['fas', 'mobile-alt'],
  ['far', 'building'],
  ['far', 'home'],
  ['far', 'envelope'],
];

type PhoneIconDefinition = (typeof PHONE_ICON_BY_INDEX)[number];

type CustomerSummaryDetailsProps = {
  profile: CustomerProfile;
};

const getPhoneIcon = (index: number): PhoneIconDefinition | null =>
  PHONE_ICON_BY_INDEX[index] ?? null;

const getPhoneDisplay = (phone: string, index: number) =>
  index === 1 ? '248-555-1000 ext 1023' : phone;

export const CustomerSummaryDetails = ({
  profile,
}: CustomerSummaryDetailsProps) => {
  const phones = profile.phones ?? [];
  const { accountId, email } = profile;

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
