import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  flex-direction: column;

  -webkit-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.25);

  background: var(--gray-900);
`
export const Content = styled.main`
  width: 73.125rem;
  height: 6.25rem;

  margin: 0 auto;
  padding: 2rem 3.125rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 12.5rem;

    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 2rem;

    svg {
      cursor: pointer;

      transition: filter 0.4s;

      &:hover {
        filter: brightness(0.5);
      }
    }

    button {
      padding: 0.5rem 1.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 0.5rem;
      border: 2px solid var(--gray-600);
      border-radius: 0.5rem;

      background: var(--gray-900);

      svg {
        height: 25px;
        width: 25px;

        color: var(--gray-600);
      }

      span {
        font-weight: 500;

        color: var(--white);
      }

      transition: all 0.4s;

      &:hover {
        border-color: var(--gray-700);

        filter: brightness(0.8);
      }
    }
  }
`
