import { createSignal } from "solid-js";

export function useLocalStorage<T>(key: string, initialValue?: T) {
  let init: T;

  try {
    const item = localStorage.getItem(key);
    init = item ? JSON.parse(item) : initialValue;
  } catch (error) {
    init = initialValue;
  }

  const [getItem, setStoredValue] = createSignal(init);

  function setItem(value: T) {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }

  return [getItem, setItem] as const;
}
