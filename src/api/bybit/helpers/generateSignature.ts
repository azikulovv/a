import crypto from "crypto";

interface IGenerateSignatureParams {
  data?: string;
  timestamp: string;
  recvWindow?: number;
  config: {
    API_SECRET_KEY: string;
    API_KEY: string;
  };
}

export function generateSignature({ timestamp, recvWindow = 5000, data, config }: IGenerateSignatureParams) {
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
