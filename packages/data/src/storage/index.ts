import * as Minio from "minio";
import { env } from "../env.js";

export const storage = new Minio.Client({
  endPoint: env.STORAGE_URL,
  accessKey: env.STORAGE_ACCESS,
  secretKey: env.STORAGE_SECRET,
  port: env.STORAGE_PORT
});
