import styled from 'styled-components'

interface ContainerProps {
  color: string
}

export const Container = styled.button<ContainerProps>`
  width: 100%;
  height: 3.125rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  border: 1px solid ${({ color }) => `var(--${color});`};
  border-radius: 0.5rem;

  background: ${({ color }) => `var(--${color});`};

  svg {
    height: 25px;
    width: 25px;
  }

  span {
    font-weight: 500;

    color: var(--white);
  }

  transition: all 0.4s;

  &:hover {
    border-color: var(--gray-700);

    filter: brightness(0.8);
  }
`
