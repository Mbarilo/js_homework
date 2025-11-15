import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  JWT_SECRET: str(),
});