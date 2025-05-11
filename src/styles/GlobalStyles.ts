import { css } from '@emotion/react';

export const globalStyles = css`
  :root {
    --primary-color: #1976D2;
    --background-light: #ffffff;
    --background-dark: #1a1a1a;
    --text-light: #222222;
    --text-dark: #ffffff;
    --border-light: #e0e0e0;
    --border-dark: #333333;
    --button-bg: #f5f5f5;
    --button-hover: #e0e0e0;
  }

  [data-theme='light'] {
    --background: var(--background-light);
    --text: var(--text-light);
    --border: var(--border-light);
  }

  [data-theme='dark'] {
    --background: var(--background-dark);
    --text: var(--text-dark);
    --border: var(--border-dark);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--text);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: var(--button-bg);
    color: var(--text-light);
    transition: background 0.2s;
  }
  button:hover {
    background: var(--button-hover);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`; 