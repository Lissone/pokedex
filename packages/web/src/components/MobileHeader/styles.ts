import styled from 'styled-components'

// -------------------------------------------------------------------

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
  readonly isOpen: boolean
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
`
