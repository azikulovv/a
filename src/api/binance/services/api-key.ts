import { fetch } from "../helpers/client";

export default {
  async get(params) {
    const { data, error } = await fetch("/sapi/v1/broker/subAccountApi", "get", null, params);
    return { data: { result: data }, error };
  },

  async create(params) {
    return await fetch("/sapi/v1/broker/subAccountApi", "post", null, params);
  },

  async update(params) {
    return await fetch("/sapi/v1/broker/subAccountApi/permission", "post", null, params);
  },

  async delete(params) {
    return await fetch("/sapi/v1/broker/subAccountApi", "delete", null, params);
  },
};
