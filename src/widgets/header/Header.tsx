import { Button } from '@/shared/ui/Button/Button'
import './Header.css'

type HeaderProps = {
  title: string
}

export const Header = ({ title }: HeaderProps) => (
  <header className="header">
    <div className="header__title">
      <span className="header__icon" aria-hidden="true">
        ☆
      </span>
      <h1>{title}</h1>
    </div>
    <Button>New Order</Button>
  </header>
)
