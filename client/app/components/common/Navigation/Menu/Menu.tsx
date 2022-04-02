import { FC } from "react";

import { useQuery } from "react-query";

import { Loader } from "@/ui";

import { GeneralMenuConstant, MainMenuConstant } from "@/constants";

import { GenreService } from "@/services";

import { MenuBlock } from "./MenuBlock/MenuBlock";
import { IMenuItem } from "./MenuItem/MenuItem.interface";

export const Menu: FC = () => {
  // API
  const { data, isLoading } = useQuery(
    "genre-menu",
    () => GenreService.getAllGenres(),
    {
      select: ({ data }) =>
        data
          .map(
            (genre) =>
              ({
                icon: genre.icon,
                link: `/genre/${genre.slug}`,
                title: genre.name,
              } as IMenuItem)
          )
          .splice(0, 4),
    }
  );

  return (
    <>
      <MenuBlock menu={MainMenuConstant} />
      <MenuBlock
        menu={{ title: "Popular genres", items: data || [] }}
        isLoading={isLoading}
        count={4}
      />
      <MenuBlock menu={GeneralMenuConstant} />
    </>
  );
};
