export const formRules = {
  required: (message?: string) => ({
    required: {
      value: true,
      message,
    },
  }),
  pattern: (pattern: RegExp, message?: string) => ({
    pattern: {
      value: pattern,
      message,
    },
  }),
  email: (message?: string) => ({
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message,
    },
  }),
  minLength: (value: number, message?: string) => ({
    minLength: {
      value,
      message,
    },
  }),
};
