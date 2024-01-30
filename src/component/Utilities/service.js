import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios(config);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [config]);

  return { data: data, loading, error, setConfig };
};

export default useApi;
