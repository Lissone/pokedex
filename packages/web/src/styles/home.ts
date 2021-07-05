import styled from 'styled-components'

export const Container = styled.main`
  padding-bottom: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: var(--gray-700);
`
export const Content = styled.div`
  width: 70rem;

  margin-top: 4rem;
  padding: 2rem 3.125rem;

  border-radius: 1rem;
  -webkit-box-shadow: 0px 0px 40px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 40px 5px rgba(0, 0, 0, 0.25);

  background: var(--gray-750);

  header {
    height: 11.875rem;

    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid var(--gray-600);

    div + div {
      width: 8.75rem;
    }
  }

  input {
    height: 3.125rem;
    width: 21rem;
    padding-left: 3rem;
    padding-right: 1rem;
    margin-top: 2.8rem;

    border: 2px solid var(--blue-200);
    border-radius: 0.5rem;

    color: var(--blue-200);
    background: var(--gray-750);

    background-image: url('/images/search.svg');
    background-size: 1.5rem;
    background-repeat: no-repeat;
    background-position: 0.85rem 0.65rem;

    &::placeholder {
      color: var(--blue-200);
    }
  }
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  h1 {
    font-weight: 200;
    font-size: 1.7rem;
    letter-spacing: 0.2rem;
  }

  strong {
    font-size: 1.7rem;
  }

  span {
    font-weight: 200;

    color: var(--blue-200);
  }
`

export const ListPokemonCards = styled.div`
  margin-top: 1.875rem;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 1.25rem;
`

export const FooterContent = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MorePokemons = styled.button`
  padding: 1rem 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  border: 2px solid var(--blue-200);
  border-radius: 0.5rem;

  background: var(--blue-900);

  span {
    font-weight: 500;

    color: var(--blue-200);
  }

  transition: filter 0.4s ease;

  &:hover {
    filter: brightness(0.8);
  }
`
