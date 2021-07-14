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

    div + div {
      padding: 1rem;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &:hover {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);

    border: 2px solid var(--primary);

    .avatar {
      border: 2px solid var(--primary);
    }
  }
`

export const PokemonAvatar = styled.div`
  height: 7.5rem;
  width: 7.5rem;

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
  }
`

export const Fields = styled.div`
  margin-left: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
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
`
