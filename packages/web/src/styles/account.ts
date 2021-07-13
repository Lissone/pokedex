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

export const LikedPokemons = styled.section`
  padding: 2rem 0;

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 2rem;
      font-weight: 400;

      color: var(--blue-200);
    }
  }
`

export const ListPokemonCards = styled.div`
  margin-top: 1.875rem;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 1.25rem;
`
