import type { ButtonHTMLAttributes } from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = ({
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => (
  <button
    className={`btn btn--${variant} btn--${size} ${className}`.trim()}
    type="button"
    {...props}
  />
);
