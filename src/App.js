import React, { useState, useReducer } from 'react';
import ThemeContect from './context';
import UseReducerDemo from './components/UseReducerDemo';

const App = () => {
  const dataFetchReducer = (state, action) => {};
  const defalutState = {
    data: '',
    isLoading: '',
    isError: '',
  };
  const [state, dispatch] = useReducer(dataFetchReducer, defalutState);

  const [theme, setTheme] = useState('light')

  console.log(state);

  return (
    <ThemeContect.Provider value={theme}>
      <div>
        <UseReducerDemo></UseReducerDemo>
        <button onClick={() => setTheme('wwww')}>change theme</button>
      </div>
    </ThemeContect.Provider>
  );
};

export default App;
