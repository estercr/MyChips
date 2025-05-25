import React from 'react';

export interface Theme {
  background: string;
  text: string;
  card: string;
  primary: string;
  border: string;
}

export const LightTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  card: '#f0f0f0',
  primary: '#1e90ff',
  border: '#cccccc',
};

export const DarkTheme: Theme = {
  background: '#121212',
  text: '#ffffff',
  card: '#1e1e1e',
  primary: '#bb86fc',
  border: '#333333',
};

export const ThemeContext = React.createContext<Theme>(LightTheme);
export const ThemeProvider = ThemeContext.Provider;
