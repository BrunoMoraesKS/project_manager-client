import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    tertiary: string;

    red: string;
    gray: string;
    black: string;
    white: string;

    oposite: string;

    heading: string;
    paragraph: string;
    background: string;
    darkerBackground: string;
  }
}
