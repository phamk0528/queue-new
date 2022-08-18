import { URL_BASE } from "../contants";

export const getContentQueue = async () => {
  const data = await fetch(URL_BASE + `/config-queue`);
  return data.json();
};
