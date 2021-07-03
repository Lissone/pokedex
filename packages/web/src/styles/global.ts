import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --white: #FAFAFA;

    --blue-200: #A1B2CD;
    --blue-900: #282D34;

    --primary: #654BB1;

    --gray-600: #6D6D6D;
    --gray-700: #3E3E3E;
    --gray-750: #444444;
    --gray-800: #3E3E3E;
    --gray-900: #171717;

    --black: #000000;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; //15px
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%; //14px
    }
  }

  body {
    background: var(--gray-700);
  }

  body, input, textarea, button {
    font: 400 1rem Poppins, sans-serif;
    border: 0;
    color: var(--white);
  }

  h3, h4, h5, h6 {
    font-weight: 500;
    color: var(--white);
  }

  h1 {
    font-weight: 700;
    font-size: 2rem;
    color: var(--white);
  }

  h2 {
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--white);
  }

  button, a {
    text-decoration: none;
    cursor: pointer;
  }
`
