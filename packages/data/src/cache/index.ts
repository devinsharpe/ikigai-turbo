import { createClient } from "redis";
import { env } from "../env.js";
import { authTokenSchema } from "./schema.js";
import { Repository } from "redis-om";

export { EntityId } from "redis-om";

export const cache = createClient({ url: env.REDIS_URL }).on("error", (err) =>
  console.log("Redis Client Error | ", err)
);

export const setupRepositories = (redis: typeof cache) => {
  const authTokenRepository = new Repository(authTokenSchema, redis);
  return {
    authToken: authTokenRepository
  };
};

export type { AuthTokenEntity } from "./schema.js";
