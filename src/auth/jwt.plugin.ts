import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

const secret= process.env.JWT_SECRET!;

export const authJwtPlugin= new Elysia({ name: "auth" })
  .use(
    jwt({
      name: "jwt",
      secret,
      exp: "7d"
    })
  );

export type AuthJwtPlugin= typeof authJwtPlugin;
