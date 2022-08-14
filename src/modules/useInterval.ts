import { useEffect, useRef } from "react";

const useInterval = (callback: () => unknown, delay: number | null) => {
  const savedCallback = useRef(callback); //최근 interval callback을 가리킴

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
