import { Button } from '@/shared/ui/Button/Button';
import './Header.scss';

type HeaderProps = {
  title: string;
  onNewOrder: () => void;
};

export const Header = ({ title, onNewOrder }: HeaderProps) => (
  <header className="header">
    <div className="header__title">
      <span className="header__icon" aria-hidden="true">
        ☆
      </span>
      <h1>{title}</h1>
    </div>
    <Button className="header__new-order" onClick={onNewOrder}>
      New Order
    </Button>
  </header>
);
