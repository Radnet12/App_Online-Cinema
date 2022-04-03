import { useEffect } from "react";

import { useRouter } from "next/router";

import { useAuth } from "./useAuth";

export const useAuthRedirect = () => {
  const { user } = useAuth();

  const { push, query } = useRouter();

  const redirectUrl = String(query.redirect) || "/";

  useEffect(() => {
    if (user) {
      push(redirectUrl);
    }
  }, [redirectUrl, user, push]);
};
