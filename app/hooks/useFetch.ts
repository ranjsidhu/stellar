import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api${url}`);
        const result: { response: T[]; message: string } =
          await response.json();
        setData(result.response);
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { isLoading, data };
}

export { useFetch };
