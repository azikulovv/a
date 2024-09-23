import crypto from "crypto";

interface IGenerateSignatureParams {
  data?: string;
  config: {
    API_KEY: string;
    API_SECRET_KEY: string;
  };
}

export function generateSignature({ data, config }: IGenerateSignatureParams) {
  const sign = crypto.createHmac("sha256", config.API_SECRET_KEY).update(data).digest("hex");

  const headers = {
    "X-MBX-APIKEY": config.API_KEY,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return { sign, headers };
}
