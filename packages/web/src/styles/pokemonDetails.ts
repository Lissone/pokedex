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

  border-radius: 1rem;
  -webkit-box-shadow: 0px 0px 40px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 40px 5px rgba(0, 0, 0, 0.25);

  background: var(--gray-750);

  header {
    padding-top: 2rem;
    padding-left: 3.125rem;
    padding-right: 3.125rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .like-button {
      width: 4rem;
      height: 4rem;

      img {
        width: 4rem;
        height: 4rem;
      }
    }

    svg {
      width: 5rem;
      height: 5rem;

      cursor: pointer;

      color: var(--gray-600);

      transition: filter 0.4s;

      &:hover {
        filter: brightness(0.8);
      }
    }

    @media (max-width: 400px) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
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

  @media (max-width: 820px) {
    height: 100%;

    flex-direction: column;

    > div {
      margin-top: -6rem;
    }

    h2 {
      margin-top: 1rem;
    }

    h1 {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`
export const PokemonAvatar = styled.div`
  height: 17rem;
  width: 17rem;
  margin-left: 2rem;

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

  @media (max-width: 820px) {
    margin-left: 0;
  }

  @media (max-width: 500px) {
    height: 12rem;
    width: 12rem;

    img {
      width: 7rem;
      height: 7rem;
    }
  }
`

export const CardContent = styled.div`
  padding-bottom: 2rem;
  padding-left: 3.125rem;
  padding-right: 3.125rem;
`
export const Row = styled.div`
  &:first-child {
    margin-left: 2.5rem;
  }

  display: flex;

  @media (max-width: 820px) {
    &:first-child {
      margin-left: 0;
    }

    flex-direction: column;
  }
`

export const ColumnLeft = styled.div`
  width: 16rem;
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 820px) {
    width: 100%;
    margin-top: 2rem;
  }
`

export const ColumnRight = styled.div`
  padding: 2rem 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 820px) {
    padding: 0;
    margin-top: 2rem;

    .secondField {
      flex-direction: column;
      align-items: center;
    }

    .secondDivider {
      width: 10rem;
      height: 2px;
      margin: 0.5rem 0;
    }
  }
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

  @media (max-width: 820px) {
    text-align: center;

    > div {
      display: flex;
      flex-direction: row;
    }
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

  @media (max-width: 1140px) {
    gap: 0;
  }

  @media (max-width: 970px) {
    > img {
      height: 9rem;
    }
  }

  @media (max-width: 680px) {
    flex-direction: column;

    > img {
      width: 12rem;

      -ms-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
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

  @media (max-width: 970px) {
    height: 10rem;
    width: 10rem;

    img {
      height: 5rem;
      width: 5rem;
    }

    > div {
      margin-top: 0;

      span {
        font-size: 0.8rem;
      }

      p {
        margin-top: -0.8rem;

        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 680px) {
    height: 15rem;
    width: 15rem;

    img {
      height: 7.5rem;
      width: 7.5rem;
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
  }
`
