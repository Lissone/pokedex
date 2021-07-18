import styled from 'styled-components'
import Link from 'next/link'
import { Form as Unform } from '@unform/web'

export const Container = styled.main`
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: url('/images/bg-log-in.png');
  background-position: bottom;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;

  @media (max-width: 750px) {
    background: #000000;
  }

  @media (max-height: 600px) {
    height: 100%;
  }

  footer {
    display: flex;
    justify-content: flex-end;

    margin-bottom: 2rem;
  }
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

      transition: all 0.4s;
    }

    > span {
      margin-top: -1rem;

      font-weight: 200;

      transition: all 0.4s;
    }

    @media (max-width: 420px) {
      img {
        width: 18rem;
      }

      > span {
        margin-top: -0.5rem;

        font-size: 0.8rem;
      }
    }
  }
`

export const Form = styled(Unform)`
  width: 100%;
  margin: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input + input {
    margin-top: 0.5rem;
  }

  input + button {
    margin-top: 1rem;
  }

  > span {
    margin-top: 1rem;
  }
`

export const Divider = styled.div`
  width: 100%;
  margin: 2rem 0;

  display: flex;
  align-items: center;

  font-weight: 400;
  line-height: 0;
  color: var(--blue-200);

  &:before {
    content: '';
    flex: 1;

    height: 1px;
    margin-right: 0.875rem;

    background: var(--blue-200);
  }

  &:after {
    content: '';
    flex: 1;

    height: 1px;
    margin-left: 0.875rem;

    background: var(--blue-200);
  }
`

export const TextLink = styled(Link)`
  color: var(--primary);
  background: transparent;

  transition: filter 0.4s;

  &:hover {
    filter: brightness(0.9);
  }
`
