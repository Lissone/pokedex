import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  color?: string
  children?: ReactNode
}

export function Button({
  title,
  color = 'primary',
  children,
  ...rest
}: ButtonProps) {
  return (
    <Container color={color} {...rest}>
      {children}

      <span>{title}</span>
    </Container>
  )
}
