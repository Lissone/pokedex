import styled from 'styled-components'

export const Container = styled.header`
  display: none;
  padding: 1rem 3.125rem;

  background: var(--gray-700);

  img {
    width: 9rem;

    cursor: pointer;
  }

  @media (max-width: 850px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`

export const Hamburguer = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;

  transition: filter 0.4s;

  &:hover {
    filter: brightness(0.7);
  }
`

interface MenuProps {
  isOpen: boolean
}

export const Menu = styled.div<MenuProps>`
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? '43.75rem' : '0')};
  margin-top: ${({ isOpen }) => (isOpen ? '1rem' : '0')};

  overflow: hidden;
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  transition: all 0.4s ease;

  button {
    margin-top: 2rem;

    display: flex;
  }

  .exit {
    margin-bottom: 1rem;
    padding: 0.5rem 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    border: 2px solid var(--blue-200);
    border-radius: 0.5rem;

    background: transparent;

    svg {
      height: 25px;
      width: 25px;

      color: var(--blue-200);
    }

    span {
      font-weight: 500;

      color: var(--white);
    }

    transition: filter 0.4s;

    &:hover {
      filter: brightness(0.7);
    }
  }
`
