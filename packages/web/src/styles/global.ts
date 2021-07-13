import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    // pallet
    --white: #FAFAFA;

    --red-200: #EA4335;
    
    --blue-200: #A1B2CD;
    --blue-900: #282D34;

    --primary: #654BB1;

    --gray-600: #6D6D6D;
    --gray-700: #3E3E3E;
    --gray-750: #444444;
    --gray-800: #3E3E3E;

    --blue-gray-900: #13111B;

    --black: #000000;

    // pokemon types colors
    --bug: #729f3f;
    --dragon: #53a4cf;
    --fairy: #fdb9e9;
    --fire: #fd7d24;
    --ghost: #7b62a3;
    --ground: #f7de3f;
    --normal: #a4acaf;
    --pyschic: #f366b9;
    --steel: #9eb7b;
    --dark: #707070;
    --electric: #eed535;
    --fighting: #d56723;
    --flying: #3dc7ef;
    --grass: #9bcc50;
    --ice: #51c4e7;
    --poison: #b97fc9;
    --rock: #a38c21;
    --water: #4592c4;

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

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .Toastify__toast-container {
    width: 30%;
  }

  ::-webkit-scrollbar {
    width: 1.3rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.65rem;
    border: 6px solid transparent;
    
    background: var(--gray-600);
    background-clip: content-box;

    &:hover {
      background-color: var(--blue-200);
    }
  }
`
