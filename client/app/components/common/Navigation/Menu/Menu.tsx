import { FC } from "react";

import { GeneralMenuConstant, MainMenuConstant } from "@/constants";

import { MenuBlock } from "./MenuBlock/MenuBlock";

export const Menu: FC = () => {
  return (
    <div>
      <MenuBlock menu={MainMenuConstant} />
      <MenuBlock menu={GeneralMenuConstant} />
    </div>
  );
};
