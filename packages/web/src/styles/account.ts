import styled from 'styled-components'

// -------------------------------------------------------------------

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

  > div {
    margin-top: 2.8rem;

    @media (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`

export const LikedPokemonsHeader = styled.header`
  width: 100%;

  display: flex;
  justify-content: space-between;

  .heading {
    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;

    svg {
      cursor: pointer;

      color: var(--gray-600);

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }

    h2 {
      font-size: 2rem;
      font-weight: 400;

      color: var(--blue-200);

      transition: all 0.4s;

      @media (max-width: 520px) {
        font-size: 1.8rem;
      }
    }

    span {
      max-width: 33rem;

      font-weight: 200;

      color: var(--blue-200);

      transition: all 0.4s;

      @media (max-width: 520px) {
        max-width: 25rem;

        font-size: 0.8rem;
      }
    }
  }

  .invisibleBox {
    width: 42px;
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
