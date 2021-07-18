import styled from 'styled-components'

export const Container = styled.div`
  width: 30.5rem;
  height: 9.8125rem;
  padding: 1.2rem;

  display: flex;
  align-items: center;

  border: 2px solid var(--gray-600);
  border-radius: 0.5rem;

  background: var(--gray-700);

  transition: all 0.6s;

  div {
    cursor: pointer;

    display: flex;
  }

  aside {
    display: flex;
  }

  &:hover {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);

    border: 2px solid var(--primary);

    .avatar {
      border: 2px solid var(--primary);
    }
  }

  @media (max-width: 520px) {
    width: 19rem;
    height: 100%;
    padding: 1.2rem 1.2rem 0 1.2rem;

    flex-direction: column;

    div {
      width: 100%;

      flex-direction: column;
      align-items: center;
    }

    aside {
      overflow: visible;

      width: 19rem;
      margin-top: 1.5rem;

      flex-direction: column;
    }
  }
`

export const PokemonAvatar = styled.div`
  height: 7.5rem;
  width: 7.5rem !important;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--gray-600);
  border-radius: 4.375rem;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  background: var(--blue-900);

  transition: all 0.6s;

  img {
    width: 4.5rem;
    height: 4.5rem;

    @media (max-width: 520px) {
      width: 3.7rem;
      height: 3.7rem;
    }
  }
`

export const Fields = styled.div`
  margin-left: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 520px) {
    margin-top: 1rem;
    margin-left: 0;
  }
`

export const Field = styled.div`
  width: 9.3rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  line-height: 1.2rem;

  span {
    font-weight: 400;

    color: var(--gray-600);
  }

  p {
    color: var(--blue-200);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`

export const Divider = styled.div`
  width: 7rem;
  height: 9.8125rem;

  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  background: var(--gray-600);

  span {
    font-size: 1.875rem;

    color: var(--gray-800);
  }

  @media (max-width: 520px) {
    overflow: visible;

    width: 19rem;
    height: 5rem;
  }
`

interface ButtonsProps {
  starIcon: boolean
}

export const Buttons = styled.footer<ButtonsProps>`
  padding: 1rem;

  display: flex;
  flex-direction: column;

  @media (max-width: 520px) {
    padding: 1.5rem 3rem;

    ${({ starIcon }) =>
      starIcon
        ? `flex-direction: row;
    justify-content: space-between;`
        : 'align-items: center;'};
  }
`
