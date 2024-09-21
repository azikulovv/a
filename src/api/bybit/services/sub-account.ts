import { fetch } from "../helpers/client";

async function _fetch(url: string, method: string = "get", data?: any) {
  const response = await fetch(url, method, data);

  return {
    message: response.data.retMsg,
    data: response.data.result,
    error: response.error,
  };
}

export default {
  async create(data) {
    return await _fetch("/v5/user/create-sub-member", "post", data);
  },
};
