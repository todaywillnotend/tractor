import { useState, useEffect } from "react";

export function useLocalStorageData<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const storedData =
    typeof window !== "undefined" ? localStorage?.getItem(key) : undefined;
  let initialData: T;

  if (storedData) {
    try {
      initialData = JSON.parse(storedData);
    } catch (err) {
      console.error(err);
      initialData = initialValue;
    }
  } else {
    initialData = initialValue;
  }

  const [data, setData] = useState<T>(initialData);

  useEffect(() => {
    const handleStorageChange = (
      e: StorageEvent & { detail: { key: string; value: string } }
    ) => {
      if (e?.detail?.key === key) {
        let value: T;
        try {
          value = JSON.parse(e.detail.value || "");
        } catch (err) {
          console.error(err);
          value = initialData;
        }
        setData(value);
      }
    };
    // @ts-ignore
    document.addEventListener("localUpdated", handleStorageChange);

    return () => {
      // @ts-ignore
      document.removeEventListener("localUpdated", handleStorageChange);
    };
  }, [key, initialData]);

  const setLocalStorageData = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));

    const event = new CustomEvent("localUpdated", {
      detail: {
        key,
        value: JSON.stringify(value),
      },
    });

    document.dispatchEvent(event);
  };

  return [data, setLocalStorageData];
}
