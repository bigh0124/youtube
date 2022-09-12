import { useEffect, useState } from "react";

const useLocalStorage = <T>(name: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(name);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [name, initialValue]);

  return [value, setValue] as [typeof value, typeof setValue];
};

export default useLocalStorage;
