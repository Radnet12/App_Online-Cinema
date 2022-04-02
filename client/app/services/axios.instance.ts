import axios from "axios";

export const $api = axios.create({
  baseURL: `${process.env.APP_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
