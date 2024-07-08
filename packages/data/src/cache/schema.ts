import { Entity, Schema } from "redis-om";

export interface AuthTokenEntity extends Entity {
  user: string;
  organization: string;
  createdAt: number;
}

export const authTokenSchema = new Schema("authTokens", {
  user: { type: "string" },
  organization: { type: "string" },
  createdAt: { type: "number" }
});
