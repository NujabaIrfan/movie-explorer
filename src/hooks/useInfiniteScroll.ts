import { useState, useEffect } from 'react';

export const useInfiniteScroll = (
  callback: () => Promise<void>,
  hasMore: boolean
): [boolean] => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = window.setTimeout(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        if (
          !isFetching &&
          hasMore &&
          scrollTop + clientHeight + 200 >= scrollHeight
        ) {
          setIsFetching(true);
        }

        timeoutId = 0;
      }, 100); // debounce delay
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (isFetching) {
      Promise.resolve(callback()).finally(() => setIsFetching(false));
    }
  }, [isFetching, callback]);

  return [isFetching];
};
