import type { HTMLAttributes, PropsWithChildren } from 'react'
import './Card.scss'

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export const Card = ({ className = '', ...props }: CardProps) => (
  <div className={`card ${className}`.trim()} {...props} />
)
