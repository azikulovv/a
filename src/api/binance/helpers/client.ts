import qs from "qs";
import axios, { type AxiosRequestConfig } from "axios";
import { generateSignature } from "./generateSignature";

const config = {
  API_URL: process.env.BINANCE_API_URL,
  API_KEY: process.env.BINANCE_API_KEY,
  API_SECRET_KEY: process.env.BINANCE_API_SECRET_KEY,
};

export async function fetch(url: string, method: string = "get", data?: any, params?: any) {
  const { sign, headers } = generateSignature({
    data: data ? JSON.stringify(data) : qs.stringify(params),
    config,
  });

  const requestConfig: AxiosRequestConfig = {
    url: config.API_URL + url + "?" + qs.stringify({ ...params, signature: sign }),
    data,
    method,
    headers,
  };

  try {
    const { data } = await axios(requestConfig);
    return { data, error: null };
  } catch (err) {
    console.log("[Binance Error]: " + err.response?.data || err.message);
    return { data: null, error: err.response?.data || err.message };
  }
}
