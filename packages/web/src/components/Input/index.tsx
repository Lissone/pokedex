import { useField } from '@unform/core'
import { InputHTMLAttributes, useEffect, useRef } from 'react'

import { Container, InputContainer, Error } from './styles'

// -------------------------------------------------------------------

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly name: string
  readonly color?: string
}

export function Input({ name, color = 'black', ...rest }: InputProps) {
  const { fieldName, registerField, error } = useField(name)
  const inputRef = useRef(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <InputContainer color={color} ref={inputRef} onChange={(e) => e.target.value} {...rest} />
      {error ? <Error>{error}</Error> : null}
    </Container>
  )
}
