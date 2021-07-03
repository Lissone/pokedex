import { InputHTMLAttributes } from 'react'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: string
}

export function Input({ color = 'black', ...rest }: InputProps) {
  return <Container color={color} {...rest} />
}
