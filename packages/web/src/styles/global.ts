import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --background: #494949;
    --light: #f8f9fa;
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
    background: var(--background);
  }

  body, input, textarea, button {
    font: 500 1rem Inter, sans-serif;
    color: var(--light);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: var(--light);
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }
`
