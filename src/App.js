import React, { useReducer } from 'react';
import UseReducerDemo from './components/UseReducerDemo';

const App = () => {
  const dataFetchReducer = (state, action) => {};
  const defalutState = {
    data: '',
    isLoading: '',
    isError: '',
  };
  const [state, dispatch] = useReducer(dataFetchReducer, defalutState);
  console.log(state);
  
  return (
    <div>
      <UseReducerDemo></UseReducerDemo>
    </div>
  );
};

export default App;
