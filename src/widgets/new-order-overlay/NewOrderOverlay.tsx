import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NewOrderOverlay.scss';

type NewOrderOverlayProps = {
  onClose: () => void;
};

export const NewOrderOverlay = ({ onClose }: NewOrderOverlayProps) => (
  <div
    className="new-order-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="New order processing"
  >
    <button
      className="new-order-overlay__close"
      type="button"
      onClick={onClose}
      aria-label="Close overlay"
    >
      <FontAwesomeIcon icon={['far', 'times']} aria-hidden="true" />
    </button>
    <div className="new-order-overlay__content">
      <span className="new-order-overlay__spinner" aria-hidden="true">
        <FontAwesomeIcon icon={['fal', 'circle-notch']} spin />
      </span>
      <span className="new-order-overlay__text">Processing</span>
    </div>
  </div>
);
