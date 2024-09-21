import { fetch } from "../helpers/client";

async function _fetch(url: string, method: string = "get", data?: any, params?: any) {
  const response = await fetch(url, method, data, params);

  return {
    message: response.data?.retMsg,
    data: response.data.result,
    error: response.error,
  };
}

export default {
  async get(params) {
    return await _fetch("/v5/user/sub-apikeys", "get", null, params);
  },

  async create(apiKey) {
    const body = {
      ...apiKey,
      permissions: {
        ContractTrade: ["Order", "Position"],
        Spot: ["SpotTrade"],
        Wallet: ["AccountTransfer", "SubMemberTransferList"],
        Options: [],
        Exchange: ["ExchangeHistory"],
        CopyTrading: ["CopyTrading"],
      },
    };

    return await _fetch("/v5/user/create-sub-api", "post", body);
  },

  async update({ apiKey, readOnly, ips }: { apiKey: string; readOnly: boolean; ips: string }) {
    const body = {
      apikey: apiKey,
      ips,
      readOnly,
      permissions: {
        ContractTrade: ["Order", "Position"],
        Spot: ["SpotTrade"],
        Wallet: ["AccountTransfer", "SubMemberTransferList"],
        Options: [],
        Exchange: ["ExchangeHistory"],
        CopyTrading: ["CopyTrading"],
      },
    };

    return await _fetch("/v5/user/update-sub-api", "post", body);
  },

  async delete({ apiKey }: { apiKey: string }) {
    const body = {
      apikey: apiKey,
    };

    return await _fetch("/v5/user/delete-sub-api", "post", body);
  },
};
