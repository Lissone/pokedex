import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Container } from './styles'

// -------------------------------------------------------------------

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly title: string
  readonly color?: string
  readonly children?: ReactNode
}

export function Button({ title, color = 'purple-500', children, ...rest }: ButtonProps) {
  return (
    <Container color={color} {...rest}>
      {children}
      <span>{title}</span>
    </Container>
  )
}
