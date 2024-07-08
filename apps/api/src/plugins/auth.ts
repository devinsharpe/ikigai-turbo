import {
  type AuthTokenEntity,
  EntityId,
  Organization,
  OrganizationMembership,
  organizationMemberships,
  organizations,
  users,
} from "@ikigai/data";
import { and, eq } from "drizzle-orm";
import type { AuthRequestData, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export const AUTH_TOKEN_COOKIE = "IKIGAI_AUTH";
export const AUTH_REQUEST_DECORATOR = "auth";

export const authPlugin: FastifyPluginAsync = async (fastify) => {
  const normalize = (text: string) => {
    return text.toLowerCase().trim();
  };

  // const authenticateEmail = (email: string, password: string) => {
  //   const userAttempt = fastify.db
  //     .select({ password: users.password })
  //     .from(users)
  //     .where(eq(users.email, normalize(email)));
  // };

  const initializeDecorators = () => {
    fastify.decorateRequest(AUTH_REQUEST_DECORATOR, {
      user: null,
      membership: null,
      organization: null,
    } as AuthRequestData);
  };

  initializeDecorators();

  fastify.addHook("onRequest", async (req, reply) => {
    const authCookie = req.cookies[AUTH_TOKEN_COOKIE];
    if (!authCookie) return;

    const authToken = (await fastify.repositories.authToken.fetch(
      authCookie,
    )) as AuthTokenEntity;

    if (!authToken[EntityId]) return;

    const currentUser =
      (
        await fastify.db
          .select()
          .from(users)
          .where(eq(users.id, authToken.user))
      )[0] ?? null;
    let currentOrganization: Organization | null = null;
    let currentMembership: OrganizationMembership | null = null;

    if (currentUser)
      currentOrganization =
        (
          await fastify.db
            .select()
            .from(organizations)
            .where(eq(organizations.id, authToken.organization))
        )[0] ?? null;

    if (currentUser && currentOrganization)
      currentMembership =
        (
          await fastify.db
            .select()
            .from(organizationMemberships)
            .where(
              and(
                eq(organizationMemberships.userId, currentUser.id),
                eq(
                  organizationMemberships.organziationId,
                  currentOrganization.id,
                ),
              ),
            )
        )[0] ?? null;

    fastify.decorateRequest(AUTH_REQUEST_DECORATOR, {
      user: currentUser,
      membership: currentMembership,
      organization: currentOrganization,
    } as AuthRequestData);
  });
};

export default fp(authPlugin);
