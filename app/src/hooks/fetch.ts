import { useState, useEffect } from "react";

export const useFetch = <T>(
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  sendData: any = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);

        switch (method) {
          case "POST":
          case "PUT":
            {
              const response = await fetch(url, {
                method,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...sendData }),
              });

              if (!response.ok) {
                setError(response.statusText);
                throw new Error(response.statusText);
              }

              const json = await response.json();
              setIsPending(false);
              setData(json);
              setError(null);
            }
            break;
          case "GET":
          case "DELETE":
            {
              const response = await fetch(url);
              if (!response.ok) {
                setError(response.statusText);
                throw new Error(response.statusText);
              }

              const json = await response.json();
              setIsPending(false);
              setData(json);
              setError(null);
            }
            break;
        }
      } catch (e) {
        setError(`${error} Could not fetch data`);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
};
