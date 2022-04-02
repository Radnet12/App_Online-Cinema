import { FC } from "react";

import { useQuery } from "react-query";

import { GeneralMenuConstant, MainMenuConstant } from "@/constants";

import { GenreService } from "@/services";

import { MenuBlock } from "./MenuBlock/MenuBlock";
import { MenuItemType } from "./MenuItem/MenuItem.type";

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
              } as MenuItemType)
          )
          .splice(0, 4),
    }
  );

  console.log(data);

  return (
    <div>
      <MenuBlock menu={MainMenuConstant} />
      <MenuBlock menu={{ title: "Popular genres", items: data || [] }} />
      <MenuBlock menu={GeneralMenuConstant} />
    </div>
  );
};
