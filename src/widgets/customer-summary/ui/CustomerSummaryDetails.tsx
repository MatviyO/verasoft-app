import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { CustomerSummaryViewModel } from '../model/types';

type CustomerSummaryDetailsProps = {
  summary: CustomerSummaryViewModel;
};

export const CustomerSummaryDetails = ({
  summary,
}: CustomerSummaryDetailsProps) => {
  const { phones, accountId, email } = summary;

  return (
    <>
      <div className="customer-summary__item customer-summary__item--id">
        <a href={`#${accountId}`} className="customer-summary__value">
          #{accountId}
        </a>
      </div>
      {phones.map((phone) => {
        return (
          <div
            className="customer-summary__item customer-summary__item--phone"
            key={phone.id}
          >
            <span className="customer-summary__icon" aria-hidden="true">
              {phone.icon && <FontAwesomeIcon icon={phone.icon} />}
            </span>
            <a href={phone.href} className="customer-summary__value">
              {phone.display}
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
