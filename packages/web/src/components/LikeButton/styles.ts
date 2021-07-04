import styled from 'styled-components'

export const Container = styled.button`
  width: 2rem;
  height: 2rem;

  background: transparent;

  transition: transform 0.4s ease;

  img {
    width: 2rem;
    height: 2rem;
  }

  &:hover,
  img {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`
