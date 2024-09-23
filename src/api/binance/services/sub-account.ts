import { fetch } from "../helpers/client";

export default {
  async create(params) {
    return await fetch("/sapi/v1/broker/subAccount", "post", null, params);
  },
};
