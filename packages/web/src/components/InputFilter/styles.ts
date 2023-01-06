import styled from 'styled-components'

// -------------------------------------------------------------------

export const Input = styled.input`
  width: 24rem;
  height: 3.125rem;
  padding-left: 3rem;
  padding-right: 1rem;

  border: 2px solid var(--gray-600);
  border-radius: 0.5rem;

  color: var(--blue-200);
  background: var(--gray-750);

  background-image: url('/images/search.svg');
  background-size: 1.5rem;
  background-repeat: no-repeat;
  background-position: 0.85rem 0.65rem;

  &::placeholder {
    color: var(--gray-600);
  }

  &:focus {
    outline: none;
    border: 2.5px solid var(--purple-500);

    background-image: url('/images/search-focus.svg');

    &::placeholder {
      color: var(--gray-600);
    }
  }

  @media (max-width: 1000px) {
    width: 30.5rem;
  }

  @media (max-width: 520px) {
    width: 19rem;

    font-size: 0.8rem;
  }
`
