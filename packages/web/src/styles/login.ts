import styled from 'styled-components'

export const Container = styled.main`
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: url('/images/bg-log-in.png');
  background-position: bottom;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
`

export const Content = styled.div`
  max-width: 70rem;
  height: 100%;

  margin: 0 auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 25rem;
    }

    > span {
      margin-top: -1rem;

      font-weight: 200;
    }
  }

  form {
    margin: 2rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input + input {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }

    > span {
      margin-top: 1rem;

      a {
        color: var(--primary);

        transition: filter 0.4s;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }

  footer {
    width: 30%;

    position: absolute;
    bottom: 0;

    margin-bottom: 1rem;
  }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;

  margin: 1.5rem 0;

  & div:nth-child(2) {
    padding: 0 1.35rem;

    font-weight: 400;
    line-height: 0;
    color: var(--blue-200);
  }

  & div:nth-child(1),
  & div:nth-child(3) {
    background: var(--blue-200);
    width: 100%;
    height: 1px;
  }
`
