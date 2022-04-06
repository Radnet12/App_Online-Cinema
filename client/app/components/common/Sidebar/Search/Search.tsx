import { SearchPanel } from "@/ui";

import { MovieService } from "@/services";

import { useSearch } from "@/hooks";

import { IMovie } from "@/types";

import { SearchList } from "./SearchList/SearchList";

import styles from "./Search.module.scss";

export const Search = () => {
  // Query
  const { data, inputHandler, isSuccess, searchTerm } = useSearch<IMovie[]>({
    key: "sidebar-movies",
    query: MovieService.getAllMovies,
  });

  return (
    <div className={styles.wrapper}>
      <SearchPanel searchTerm={searchTerm} inputHandler={inputHandler} />
      {isSuccess && <SearchList movies={data || []} />}
    </div>
  );
};
