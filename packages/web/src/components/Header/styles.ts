import styled from 'styled-components'

// -------------------------------------------------------------------

export const Container = styled.header`
  padding-bottom: 2rem;

  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-600);

  @media (max-width: 850px) {
    display: none;
  }
`

export const Content = styled.div`
  max-width: 26rem;

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
