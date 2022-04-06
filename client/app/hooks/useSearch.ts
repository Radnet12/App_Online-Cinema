import { ChangeEvent, useState } from "react";

import { useQuery } from "react-query";

import { useDebounce } from "./useDebounce";

interface useSearchProps<T> {
  key: string;
  query: (searchTerm?: string) => Promise<T>;
}
type QueryFunctionType = (searchTerm: string) => () => any;

export const useSearch = <T>({ key, query }: useSearchProps<T>) => {
  // **Local state
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, 500);

  const { isSuccess, data } = useQuery(
    [`search-${key}`, debouncedValue],
    () => query(debouncedValue),
    {
      enabled: !!debouncedValue,
    }
  );

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return { inputHandler, isSuccess, searchTerm, data };
};
