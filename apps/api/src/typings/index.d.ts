import * as fastify from "fastify";
import * as http from "http";
import type {
  cache,
  db,
  storage,
  setupRepositories,
  User,
  Organization,
  OrganizationMembership,
} from "@ikigai/data";
import type { FastifyCookieOptions } from "@fastify/cookie";

declare module "fastify" {
  export interface AuthRequestData {
    user: User | null;
    membership: OrganizationMembership | null;
    organization: Organization | null;
  }

  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse,
  > {
    db: typeof db;
    cache: typeof cache;
    repositories: ReturnType<typeof setupRepositories>;
    storage: typeof storage;
  }
  export interface FastifyRequest {
    auth: AuthRequestData;
  }
}

export {};
