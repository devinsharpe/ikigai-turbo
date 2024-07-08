import { type FastifyPluginAsync } from "fastify";
import { db } from "@ikigai/data";
import fp from "fastify-plugin";

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("db", db);
  fastify.log.info("Connected: DB");
};

export default fp(databasePlugin);
