import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from API with fallback to dummy data
 * @param {Function} apiCall - The API function to call
 * @param {Array|Object} fallbackData - The fallback data if API fails or returns empty
 * @param {Object} options - Additional options
 * @param {boolean} options.extractData - Whether to extract data from response (default: true)
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetchData = (apiCall, fallbackData, options = {}) => {
  const { extractData = true } = options;
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();

      // Handle the response structure
      let responseData = response;
      if (extractData && response?.data) {
        responseData = response.data;
      }

      // Check if we got valid data
      const hasData = Array.isArray(responseData)
        ? responseData.length > 0
        : responseData && Object.keys(responseData).length > 0;

      if (hasData) {
        setData(responseData);
        setUsingFallback(false);
      } else {
        // No data from API, use fallback
        setData(fallbackData);
        setUsingFallback(true);
      }
    } catch (err) {
      console.warn('API call failed, using fallback data:', err.message);
      setData(fallbackData);
      setUsingFallback(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, usingFallback, refetch: fetchData };
};

/**
 * Custom hook for fetching multiple resources in parallel
 * @param {Array} requests - Array of { key, apiCall, fallbackData }
 * @returns {Object} - { data: { [key]: data }, loading, errors }
 */
export const useFetchMultiple = (requests) => {
  const [data, setData] = useState(() => {
    const initial = {};
    requests.forEach(({ key, fallbackData }) => {
      initial[key] = fallbackData;
    });
    return initial;
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const results = {};
      const newErrors = {};

      await Promise.all(
        requests.map(async ({ key, apiCall, fallbackData }) => {
          try {
            const response = await apiCall();
            let responseData = response;
            if (response?.data) {
              responseData = response.data;
            }

            const hasData = Array.isArray(responseData)
              ? responseData.length > 0
              : responseData && Object.keys(responseData).length > 0;

            results[key] = hasData ? responseData : fallbackData;
          } catch (err) {
            console.warn(`Failed to fetch ${key}:`, err.message);
            results[key] = requests.find(r => r.key === key)?.fallbackData;
            newErrors[key] = err.message;
          }
        })
      );

      setData(results);
      setErrors(newErrors);
      setLoading(false);
    };

    fetchAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, errors };
};

export default useFetchData;