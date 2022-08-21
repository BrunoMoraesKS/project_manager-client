import * as styled from 'styled-components';

export const weight = {
  xlg: '700',
  lg: '600',
  md: '500',
  sm: '400',
  xsm: '300',
};

export const breakpoints = {
  hg: '1800px',
  xxlg: '1440px',
  xlg: '1300px',
  lg: '1170px',
  md: '969px',
  sm: '768px',
  xsm: '450px',
};

export const GlobalStyles = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smooothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body,
  html {
    scroll-behavior: smooth;

    background-color: ${({ theme }) => theme.background};

    font-family: 'Open Sans', sans-serif;
    font-size: 62.5%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  p,
  span {
    color: ${({ theme }) => theme.paragraph};
  }

  p {
    font-size: 2rem;
  }

  span {
    font-size: 1.7rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Raleway', sans-serif;
    color: ${({ theme }) => theme.heading};
    letter-spacing: 0.5px;
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    display: flex;
    align-self: flex-start;
    font-size: 3rem;
  }
  h3 {
    font-size: 2.5rem;
    font-weight: ${weight.md};
  }
  h4,
  h5,
  h6 {
    font-size: 1.45rem;
    font-weight: ${weight.lg};
    letter-spacing: 1.5px;
  }
`;
