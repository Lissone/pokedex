import styled from 'styled-components'

// -------------------------------------------------------------------

export const Button = styled.button`
  padding: 0.5rem 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  border: 2px solid var(--red-400);
  border-radius: 0.5rem;

  background: rgba(130, 68, 68, 0.1);

  svg {
    height: 25px;
    width: 25px;

    color: var(--red-200);
  }

  span {
    font-weight: 500;

    color: var(--red-200);
  }

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`
