import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { InputContainer, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  color?: string
}

export function Input({ color = 'black', name, ...rest }: InputProps) {
  const inputRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <>
      <InputContainer
        color={color}
        ref={inputRef}
        onChange={e => e.target.value}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </>
  )
}
