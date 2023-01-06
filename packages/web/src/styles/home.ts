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

  > div {
    margin-top: 2.8rem;

    display: flex;
    flex-direction: column;

    @media (max-width: 1000px) {
      align-items: center;

      input {
        width: 30.5rem;
      }
    }

    @media (max-width: 850px) {
      margin-top: 1.8rem;
    }

    @media (max-width: 520px) {
      input {
        width: 19rem;

        font-size: 0.8rem;
      }
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
  border: 2px solid var(--gray-600);
  border-radius: 0.5rem;

  background: var(--gray-700);

  span {
    font-weight: 500;

    color: var(--blue-200);
  }

  transition: all 0.4s ease;

  &:hover {
    border: 2px solid var(--blue-200);
    background: var(--gray-800);

    filter: brightness(0.85);
  }
`
