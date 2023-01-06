import styled from 'styled-components'

// -------------------------------------------------------------------

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
`

interface InputContainerProps {
  readonly color: string
}

export const InputContainer = styled.input<InputContainerProps>`
  width: 100%;
  height: 3.125rem;

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
  margin: 0.4rem 0;

  color: var(--red-500);

  font-weight: 200;
`
