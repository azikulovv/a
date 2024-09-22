import qs from "qs";
import { generateSignature } from "./generateSignature";
import axios, { type AxiosRequestConfig } from "axios";

const config = {
  API_URL: process.env.BYBIT_API_URL,
  API_KEY: process.env.BYBIT_API_KEY,
  API_SECRET_KEY: process.env.BYBIT_API_SECRET_KEY,
};

export async function fetch(url: string, method: string = "get", data?: any, params?: any) {
  const { headers } = generateSignature({
    timestamp: Date.now().toString(),
    data: data ? JSON.stringify(data) : qs.stringify(params),
    config,
  });

  const requestConfig: AxiosRequestConfig = {
    url: config.API_URL + url,
    data,
    params,
    method,
    headers,
  };

  try {
    const { data, status } = await axios(requestConfig);
    return { data, status };
  } catch (err) {
    console.log("[Bybit Error]: " + err.response?.data || err.message);
    return { data: null, error: err.response?.data || err.message };
  }
}
