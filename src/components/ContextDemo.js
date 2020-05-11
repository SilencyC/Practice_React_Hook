import React, { useContext } from 'react';
import ThemeContext from '../context';

export default function ContextDemo(params) {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}
