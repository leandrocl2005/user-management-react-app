import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0%;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #fff;
    color: #182c1e;
    -wekit-font-smoothing: antialiased;
    width: 100vw;
  }

  body, input, textarea, button {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  html {
    scroll-behavior: smooth;
  }
`;
