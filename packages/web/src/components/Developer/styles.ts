import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  h4 {
    font-weight: 400;
    color: var(--white);

    cursor: default;
  }

  .card-front,
  .card-back {
    position: absolute;

    &:before {
      z-index: 1;
    }
    &:after {
      z-index: 2;
    }
  }

  .card-front {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    transition: 1s cubic-bezier(0.25, 0.8, 0.25, 1);
    backface-visibility: hidden;

    svg {
      margin: 4px 8px;
    }

    &:before,
    &:after {
      position: absolute;
    }
  }

  .card-back {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    transition: 1s cubic-bezier(0.25, 0.8, 0.25, 1);

    transform: rotateX(180deg);
    backface-visibility: hidden;

    .row {
      margin-top: 0.8rem;
      display: flex;
    }

    &:before,
    &:after {
      position: absolute;
    }
  }

  &:hover .card-front {
    transform: rotateX(-180deg);
  }
  &:hover .card-back {
    transform: rotateX(0deg);
  }
`

export const IconLink = styled.a`
  margin: 0 0.5rem;
  padding: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--blue-900);

  border-radius: 6.25rem;

  transition: all 0.2s ease-in-out;

  svg {
    color: var(--gray-600);
  }

  &:hover {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);

    svg {
      color: var(--primary);
    }
  }
`
