import styled from 'styled-components'

export const Container = styled.header`
  height: 11.875rem;

  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-600);

  div {
    width: 8.75rem;

    display: flex;
    flex-direction: column;

    button {
      padding: 0.5rem 1.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 0.5rem;
      border: 2px solid var(--blue-200);
      border-radius: 0.5rem;

      background: transparent;

      svg {
        height: 25px;
        width: 25px;

        color: var(--blue-200);
      }

      span {
        font-weight: 500;

        color: var(--white);
      }

      transition: filter 0.4s;

      &:hover {
        filter: brightness(0.7);
      }
    }
  }

  @media (max-width: 850px) {
    height: 100%;
    padding-bottom: 2rem;

    justify-content: center;

    > div {
      display: none;
    }
  }
`
export const Content = styled.main`
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

    transition: all 0.4s;

    @media (max-width: 520px) {
      font-size: 0.8rem;
    }
  }
`
