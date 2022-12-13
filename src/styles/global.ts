import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    outline: 0;
  }

  ul {
    list-style: none;
  }

  html {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.6rem;
  }
  
  html,
  body {
    height: 100vh;
    width: 100vw;
  }

  .App {
    width: 100vw;
    height: 100vh;
    max-height: 100%;
    background-color: black;
    color: #fff;

    display: flex;
    flex-direction: column;
  }
`;
