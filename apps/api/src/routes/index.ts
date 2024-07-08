import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const routesPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/users", async function handler(request, reply) {
    return { auth: request.auth };
  });
};

export default fp(routesPlugin);
