import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { cache, setupRepositories } from "@ikigai/data/cache";
import fp from "fastify-plugin";

const cachePlugin: FastifyPluginAsync = async (fastify) => {
  const valkeyCache = await cache.connect();
  fastify.decorate("cache", valkeyCache);
  fastify.decorate("repositories", setupRepositories(valkeyCache));

  if ((await valkeyCache.ping()) == "PONG")
    fastify.log.info("Connected: Valkey");

  fastify.addHook("onClose", async (fastify: FastifyInstance) => {
    await fastify.cache.quit();
  });
};

export default fp(cachePlugin);
