import { fetch } from "../helpers/client";

export default {
  async get(params) {
    return await fetch("/sapi/v1/broker/subAccountApi", "get", null, params);
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
