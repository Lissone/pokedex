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

  footer {
    width: 30%;

    position: absolute;
    bottom: 0;

    margin-bottom: 1rem;
  }
`

export const Form = styled(Unform)`
  margin: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div + div + div {
    margin-top: 0.5rem;
  }

  div + button {
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
