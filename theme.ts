import { createGlobalStyle } from "styled-components";

type Theme = {
  backgroundColor: string;
  fontColor: string;
  invertFontColor: string;
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;
  progressBarBackground: string;
  progressBarFill: string;
};

export const GlobalStyles = createGlobalStyle`
  :root {
    --background-color: ${({ theme }: { theme: Theme }) =>
      theme.backgroundColor};
    --font-color: ${({ theme }: { theme: Theme }) => theme.fontColor};
    --invert-font-color: ${({ theme }: { theme: Theme }) =>
      theme.invertFontColor};
    --secondary-color: ${({ theme }: { theme: Theme }) => theme.secondaryColor};
    --primary-color: ${({ theme }: { theme: Theme }) => theme.primaryColor};
    --error-color: ${({ theme }: { theme: Theme }) => theme.errorColor};
    --progress-bar-background: ${({ theme }: { theme: Theme }) =>
      theme.progressBarBackground};
    --progress-bar-fill: ${({ theme }: { theme: Theme }) =>
      theme.progressBarFill};
  }
`;
export const lightTheme: Theme = {
  backgroundColor: "#fff",
  fontColor: "#151515",
  invertFontColor: "#fff",
  primaryColor: "#1a95e0",
  secondaryColor: "#727578",
  errorColor: "#d20962",
  progressBarBackground: "#727578",
  progressBarFill: "#151515",
};
export const darkTheme: Theme = {
  backgroundColor: "#222225",
  fontColor: "#e8e9ed",
  invertFontColor: "#222225",
  primaryColor: "#62c4ff",
  secondaryColor: "#a3abba",
  errorColor: "#ff3c74",
  progressBarBackground: "#3f3f44",
  progressBarFill: "#62c4ff",
};