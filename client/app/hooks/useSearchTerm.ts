import { ChangeEvent, useState } from "react";

import { useQuery } from "react-query";

import { useDebounce } from "./useDebounce";

interface Response<T> {
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isSuccess: boolean;
  searchTerm: string;
  data: T;
}
type QueryFunctionType = (searchTerm: string) => () => any;

export const useSearchTerm = <T>(
  key: string,
  query: QueryFunctionType
): Response<T> => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, 500);

  const { isSuccess, data } = useQuery(
    [`search-${key}`, debouncedValue],
    query(debouncedValue),
    {
      select: ({ data }) => data,
      enabled: !!debouncedValue,
    }
  );

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return { inputHandler, isSuccess, searchTerm, data };
};
