import { useState, useEffect, useMemo } from 'react';

const useSearch = (text, searchTerm) => {
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setCurrentIndex(-1);
      return;
    }

    const regex = new RegExp(searchTerm, 'gi');
    const matches = [];
    let match;
    while ((match = regex.exec(text))) {
      matches.push(match.index);
    }

    setResults(matches);
    setCurrentIndex(matches.length > 0 ? 0 : -1);
  }, [searchTerm, text]);

  const nextResult = () => {
    if (results.length > 0) {
      setCurrentIndex((currentIndex + 1) % results.length);
    }
  };

  const prevResult = () => {
    if (results.length > 0) {
      setCurrentIndex(
        (currentIndex - 1 + results.length) % results.length
      );
    }
  };

  return useMemo(
    () => ({ results, currentIndex, nextResult, prevResult }),
    [results, currentIndex]
  );
};

export default useSearch;
