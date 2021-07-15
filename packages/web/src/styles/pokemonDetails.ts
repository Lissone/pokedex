import styled from 'styled-components'

export const Container = styled.main`
  padding-bottom: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Content = styled.div`
  width: 70rem;

  margin-top: 4rem;

  border-radius: 1rem;
  -webkit-box-shadow: 0px 0px 40px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 40px 5px rgba(0, 0, 0, 0.25);

  background: var(--gray-750);

  header {
    padding-top: 2rem;
    padding-left: 3.125rem;
    padding-right: 3.125rem;

    display: flex;
    justify-content: flex-end;

    .like-button {
      width: 4rem;
      height: 4rem;

      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }
`

export const Band = styled.div`
  height: 8.75rem;
  margin-top: 2rem;
  padding-left: 3.125rem;
  padding-right: 3.125rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);

  background: var(--gray-600);

  h2 {
    font-size: 2.625rem;

    color: var(--gray-800);
  }

  h1 {
    margin-right: 4.5rem;

    font-size: 2.625rem;

    color: var(--blue-900);
  }
`
export const PokemonAvatar = styled.div`
  height: 17rem;
  width: 17rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--primary);
  border-radius: 8.5rem;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  background: var(--blue-900);

  transition: all 0.6s;

  img {
    width: 10rem;
    height: 10rem;
  }
`

export const CardContent = styled.div`
  padding-bottom: 2rem;
  padding-left: 3.125rem;
  padding-right: 3.125rem;
`
export const Row = styled.div`
  display: flex;
`

export const ColumnLeft = styled.div`
  width: 16rem;
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ColumnRight = styled.div`
  padding: 2rem 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Fields = styled.div`
  display: flex;
  gap: 1rem;
`

interface FieldProps {
  align: 'center' | 'start'
}

export const Field = styled.div<FieldProps>`
  margin: 0 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  font-size: 1.625rem;
  text-align: ${({ align }) => align};
  line-height: 2rem;

  > div {
    margin-top: 1rem;
    gap: 1rem;
  }

  span {
    font-weight: 400;

    color: var(--gray-600);
  }

  p {
    color: var(--blue-200);
  }
`

export const Divider = styled.div`
  width: 2px;
  height: 3rem;

  border-radius: 1px;

  background: var(--gray-800);
`

export const EvolutionRow = styled.div`
  margin-top: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 2rem;

  > img:nth-child(1) {
    display: none;
  }
`

export const PokemonAvatarEvolution = styled.div`
  height: 14rem;
  width: 14rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 5px solid var(--blue-900);
  border-radius: 8.5rem;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  background: var(--gray-700);

  transition: all 0.6s;

  img {
    width: 7rem;
    height: 7rem;
  }

  > div {
    margin-top: 0.7rem;

    span {
      font-size: 1.3rem;
    }

    p {
      font-size: 1rem;
    }
  }

  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);

    filter: brightness(0.9);
  }
`
