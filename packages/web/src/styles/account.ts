import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: var(--gray-700);
`
export const Content = styled.div`
  width: 70rem;

  margin-top: 4rem;
  margin-bottom: 1rem;
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

    @media (max-width: 1000px) {
      width: 30.5rem;
    }

    @media (max-width: 520px) {
      width: 19rem;

      font-size: 0.8rem;
    }
  }

  @media (max-width: 1140px) {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;

    border-radius: 0;
    -webkit-box-shadow: 0px 0px 0px 0px;
    box-shadow: 0px 0px 0px 0px;
  }
`

export const LikedPokemons = styled.section`
  padding: 2rem 0;

  align-items: center;
  justify-content: center;

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 2rem;
      font-weight: 400;

      color: var(--blue-200);

      transition: all 0.4s;

      @media (max-width: 520px) {
        font-size: 1.8rem;
      }
    }
  }

  > div {
    margin-top: 2.8rem;

    @media (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`

export const ListPokemonCards = styled.div`
  margin-top: 1.875rem;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 1.25rem;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
