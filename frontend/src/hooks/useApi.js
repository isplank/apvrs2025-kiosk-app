import { useState, useEffect } from 'react';

export const useApi = (apiFunction, params = null, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (executeParams = params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(executeParams);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && params) {
      execute(params);
    }
  }, []);

  return { data, loading, error, execute };
};