import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api${url}`);
        const result: { response: T[]; message: string; count?: number } =
          await response.json();
        setData(result.response);
        setCount(result.count);
      } catch (error) {
        console.error(error);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { isLoading, data, count };
}

export { useFetch };
