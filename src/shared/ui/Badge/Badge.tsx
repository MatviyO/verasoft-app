import type { HTMLAttributes, PropsWithChildren } from 'react';
import './Badge.scss';

type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'dark' }
>;

export const Badge = ({
  className = '',
  tone = 'neutral',
  ...props
}: BadgeProps) => (
  <span className={`badge badge--${tone} ${className}`.trim()} {...props} />
);
