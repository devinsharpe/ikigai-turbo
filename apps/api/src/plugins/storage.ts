import type { FastifyPluginAsync } from "fastify";
import { storage } from "@ikigai/data";
import fp from "fastify-plugin";

const storagePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("storage", storage);
  fastify.log.info("Connected: Storage");
};

export default fp(storagePlugin);
