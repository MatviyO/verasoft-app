import type { HTMLAttributes, PropsWithChildren } from 'react'
import './Badge.css'

type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'dark' }
>

export const Badge = ({
  className = '',
  tone = 'neutral',
  ...props
}: BadgeProps) => (
  <span className={`badge badge--${tone} ${className}`.trim()} {...props} />
)
