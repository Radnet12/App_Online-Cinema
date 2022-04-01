import { MenuBlockType } from "@/common/Navigation/components/Menu/components/MenuBlock/MenuBlock.type";

export const MainMenuConstant: MenuBlockType = {
  title: "Menu",
  items: [
    {
      icon: "MdHome",
      link: "/",
      title: "Home",
    },
    {
      icon: "MdExplore",
      link: "/genres",
      title: "Discovery",
    },
    {
      icon: "MdRefresh",
      link: "/fresh",
      title: "Fresh movies",
    },
    {
      icon: "MdLocalFireDepartment",
      link: "/trending",
      title: "Trending now",
    },
  ],
};

export const GeneralMenuConstant: MenuBlockType = {
  title: "General",
  items: [],
};
