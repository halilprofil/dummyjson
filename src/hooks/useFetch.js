import { useState, useEffect } from "react";

export function useFetch(callback, dependencies = []) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    callback()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { data, loading, error };
}
