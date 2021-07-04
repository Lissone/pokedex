import styled from 'styled-components'

interface ContainerProps {
  textColor: string
}

export const Container = styled.div<ContainerProps>`
  padding: 0.5rem 1rem;

  border: 2px solid var(--blue-200);
  border-radius: 0.5rem;

  background: var(--gray-700);

  transition: transform 0.4s ease;

  h5 {
    font-weight: 500;

    color: ${({ textColor }) => `var(--${textColor});`} !important;
  }

  &:hover {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
`
