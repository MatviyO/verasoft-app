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
      <span aria-hidden="true">×</span>
    </button>
    <div className="new-order-overlay__content">
      <span className="new-order-overlay__spinner" aria-hidden="true" />
      <span className="new-order-overlay__text">Processing</span>
    </div>
  </div>
);
