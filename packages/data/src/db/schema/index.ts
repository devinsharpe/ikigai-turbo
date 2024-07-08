import { text, sqliteTable, integer, unique } from "drizzle-orm/sqlite-core";
import { env } from "../../env.js";
import { sql } from "drizzle-orm";

export enum UserStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Locked = "LOCKED"
}

export enum FactorAttempt {
  Password = "PASSWORD",
  Email = "EMAIL",
  TOTP = "TOTP"
}

export enum MemberRole {
  Admin = "ADMIN",
  Member = "MEMBER",
  Viewer = "VIEWER"
}

const standardColumns = {
  id: (name = "id") => text(name, { length: env.ID_LENGTH }),
  createdAt: (name = "createdAt") =>
    integer(name, { mode: "timestamp" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull()
};

export const organizations = sqliteTable("organziations", {
  id: standardColumns.id().primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline", { length: 128 }).default("").notNull(),
  description: text("description").default("").notNull(),
  imageUrl: text("imageUrl"),
  createdById: standardColumns.id("createdById"),
  createdAt: standardColumns.createdAt()
});

export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = typeof organizations.$inferInsert;

export const users = sqliteTable("users", {
  id: standardColumns.id().primaryKey(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  imageUrl: text("imageUrl"),
  defaultOrganizationId: text("defaultOrganization", {
    length: env.ID_LENGTH
  }).references(() => organizations.id, { onDelete: "set null" }),
  status: text("status", {
    enum: [UserStatus.Active, UserStatus.Inactive, UserStatus.Locked]
  }),
  createdAt: standardColumns.createdAt()
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const userAuthenticationAttempts = sqliteTable(
  "userAuthenicateAttempts",
  {
    id: standardColumns.id().primaryKey(),
    userId: standardColumns
      .id("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    factorAttempt: text("factorAttempt", {
      enum: [FactorAttempt.Password, FactorAttempt.Email, FactorAttempt.TOTP]
    }).notNull(),
    createdAt: standardColumns.createdAt()
  }
);

export type UserAuthenicateAttempt =
  typeof userAuthenticationAttempts.$inferSelect;
export type InsertUserAuthenticateAttempt =
  typeof userAuthenticationAttempts.$inferInsert;

export const organizationMemberships = sqliteTable(
  "organizationMemberships",
  {
    id: standardColumns.id().primaryKey(),
    userId: standardColumns
      .id("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    organziationId: standardColumns
      .id("organizationId")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    imageUrl: text("imageUrl"),
    role: text("role", {
      enum: [MemberRole.Admin, MemberRole.Member, MemberRole.Viewer]
    }).notNull(),
    createdAt: standardColumns.createdAt()
  },
  (t) => ({
    userOrganizationUnique: unique().on(t.userId, t.organziationId)
  })
);

export type OrganizationMembership =
  typeof organizationMemberships.$inferSelect;
export type InsertOrganizationMembership =
  typeof organizationMemberships.$inferInsert;
