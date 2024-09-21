import axios, { type AxiosRequestConfig } from "axios";
import crypto from "crypto";
import qs from "qs";

const config = {
  API_URL: process.env.BYBIT_API_URL,
  API_KEY: process.env.BYBIT_API_KEY,
  API_SECRET_KEY: process.env.BYBIT_API_SECRET_KEY,
};

interface IGenerateSignatureParams {
  data?: string;
  timestamp: string;
  recvWindow?: number;
}

function generateSignature({ timestamp, recvWindow = 5000, data }: IGenerateSignatureParams) {
  const sign = crypto
    .createHmac("sha256", config.API_SECRET_KEY)
    .update(`${timestamp}${config.API_KEY}${recvWindow}${data}`)
    .digest("hex");

  const headers = {
    "X-BAPI-SIGN-TYPE": "2",
    "X-BAPI-SIGN": sign,
    "X-BAPI-API-KEY": config.API_KEY,
    "X-BAPI-TIMESTAMP": timestamp,
    "X-BAPI-RECV-WINDOW": recvWindow.toString(),
  };

  return { sign, headers };
}

export async function fetch(url: string, method: string = "get", data?: any, params?: any) {
  const { headers } = generateSignature({
    timestamp: Date.now().toString(),
    data: data ? JSON.stringify(data) : qs.stringify(params),
  });

  console.log("DAta:", data ? JSON.stringify(data) : qs.stringify(params))

  const requestConfig: AxiosRequestConfig = {
    url: config.API_URL + url,
    data,
    params,
    method,
    headers,
  };

  try {
    const { data } = await axios(requestConfig);
    return { data };
  } catch (err) {
    console.log("[Backend Error]: " + err.response?.data || err.message);
    return { data: null, error: err.response?.data || err.message };
  }
}
