import styled from 'styled-components'

interface InputContainerProps {
  color: string
}

export const InputContainer = styled.input<InputContainerProps>`
  height: 3.125rem;
  width: 22.5rem;

  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--blue-200);
  border-radius: 0.5rem;

  color: var(--blue-200);
  background: ${({ color }) => `var(--${color});`};
`

export const Error = styled.div`
  margin-top: 0.4rem;
  margin-bottom: 0.2rem;

  font-weight: 200;
`
