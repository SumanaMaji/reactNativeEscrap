import React, {useState, useEffect} from 'react';

export default useDebounce = (value, timeout) => {
  const [debauncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeout]);

  return debauncedValue;
};
