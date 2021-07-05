import styled from 'styled-components'

export const Container = styled.button`
  height: 8.75rem;
  width: 8.75rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--blue-200);
  border-radius: 4.375rem;

  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);

  background: var(--gray-700);

  transition: transform 0.4s;

  svg,
  img {
    width: 5.5rem;
    height: 5.5rem;

    transition: opacity 0.4s;
  }

  span {
    width: 100%;
    position: absolute;
    margin-right: 3.1rem;

    font-size: 1.2rem;
    font-weight: 200;
    text-align: right;
    opacity: 0;

    transition: opacity 0.4s;
  }

  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);

    svg,
    img {
      opacity: 0.3;
    }

    span {
      opacity: 1;
    }
  }
`
