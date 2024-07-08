import Fastify from "fastify";
import { env } from "./env.js";
import { envToLogger } from "./logging.js";

import authPlugin from "./plugins/auth.js";
import databasePlugin from "./plugins/database.js";
import cachePlugin from "./plugins/cache.js";
import storagePlugin from "./plugins/storage.js";
import routesPlugin from "./routes/index.js";

import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({
  logger: envToLogger[env.ENVIRONMENT],
  ignoreTrailingSlash: true,
});

fastify.register(fastifyCookie, {
  secret: env.APP_KEY,
  hook: "onRequest",
  parseOptions: {},
} as FastifyCookieOptions);

await fastify.register(fastifyCors, {
  origin: true,
});
fastify.register(fastifyHelmet, {
  global: true,
});

fastify.register(databasePlugin);
fastify.register(cachePlugin);
fastify.register(storagePlugin);

fastify.register(authPlugin);

fastify.register(routesPlugin);

try {
  await fastify.listen({ port: env.API_PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
