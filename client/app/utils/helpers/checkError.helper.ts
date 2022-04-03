export const checkError = (error: any) => {
  if (error.response && error.response.data) {
    if (typeof error.response.data.message === "object") {
      return error.response.data.message[0];
    } else {
      return error.response.data.message;
    }
  } else {
    return error.message;
  }
};
