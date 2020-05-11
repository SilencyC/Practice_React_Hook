import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

export default function UseReducer() {
  const [query, setQuery] = useState('redux');
  const [
    { data, isLoading, isError },
    setUrl,
  ] = useCustomHook('https://hn.algolia.com/api/v1/search?query=redux', {
    hits: [],
  });

  return (
    <Fragment>
      <form
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
      )}
    </Fragment>
  );
}

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
