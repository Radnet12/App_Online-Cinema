import { toast } from "react-toastify";

import { checkError } from "./checkError.helper";

export const showError = (error: any) => {
  let message = checkError(error);

  toast.error(message);

  throw message;
};
