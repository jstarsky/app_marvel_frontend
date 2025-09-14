import axios from "axios";
import crypto from "crypto";

const SERVER_MARVEL_BASE = process.env.NEXT_PUBLIC_MARVEL_API_URL;

const serverMarvel = axios.create({
  baseURL: SERVER_MARVEL_BASE,
  timeout: 100000,
});

serverMarvel.interceptors.request.use((config) => {
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
  const privateKey = process.env.NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY;
  if (!publicKey || !privateKey) {
    throw new Error("Missing Marvel API keys (server)");
  }

  const ts = Date.now().toString();
  const hash = crypto.createHash("md5").update(ts + privateKey + publicKey).digest("hex");

  config.params = { ...(config.params || {}), apikey: publicKey, ts, hash };
  return config;
});

export default serverMarvel;
