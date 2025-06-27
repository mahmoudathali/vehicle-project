import { useState, useCallback } from 'react';

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = useCallback(async (callback) => {
    setIsLoading(true);
    try {
      await callback();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  return { isLoading, withLoading };
};