import React, { useState, useEffect, Fragment, useReducer } from 'react';
import axios from 'axios';

export default function UseReducer() {
  const [query, setQuery] = useState('redux');

  //only useState custom hook
  // const [{ data, isLoading, isError }, setUrl] = useCustomHook(
  //   'https://hn.algolia.com/api/v1/search?query=redux',
  //   {
  //     hits: [],
  //   }
  // );

  const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        return { ...state };
    }
  };

  //useReducer
  const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(() => initialUrl);

    const defalutState = {
      data: initialData,
      isLoading: false,
      isError: false,
    };

    const [state, dispatch] = useReducer(dataFetchReducer, defalutState);

    useEffect(() => {
      let didCancle = false;
      const fatchData = async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await axios(url);
          if (!didCancle) {
            dispatch({ type: 'SET_DATA', payload: result.data });
          }
        } catch (event) {
          if (!didCancle) {
            dispatch({ type: 'FETCH_FAILURE' });
          }
        }
      };
      fatchData();

      return () => {
        didCancle = true;
      }
    }, [url]);

    return [state, setUrl];
  };

  const [state, setUrl] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    {
      hits: [],
    }
  );

  return (
    <Fragment>
      
      {/* only useState  */}
      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => {
            return (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      )} */}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setUrl(() => {
            return `https://hn.algolia.com/api/v1/search?query=${query}`;
          });
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {state.isError && <div>Something went wrong ...</div>}

      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {state.data.hits.map((item) => {
            return (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
}

//only useState
const useCustomHook = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setisError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (e) {
        setisError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
