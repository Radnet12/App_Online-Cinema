import { FC, MouseEvent } from "react";

import { Icon } from "@/ui";

import { useActions, useAuth } from "@/hooks";

import { MenuItem } from "../MenuItem/MenuItem";

export const AuthMenuBlock: FC = () => {
  const { user } = useAuth();

  // **Dispatch
  const { logout } = useActions();

  const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      {user ? (
        <>
          <MenuItem
            item={{ icon: "MdSettings", title: "Profile", link: "/profile" }}
          />
          <li>
            <a onClick={logoutHandler}>
              <Icon icon="MdLogout" />
              <span>Logout</span>
            </a>
          </li>
        </>
      ) : (
        <MenuItem item={{ icon: "MdLogin", title: "Login", link: "/auth" }} />
      )}
      {user?.isAdmin && (
        <MenuItem
          item={{
            icon: "MdOutlineLock",
            title: "Admin panel",
            link: "/manage",
          }}
        />
      )}
    </>
  );
};
