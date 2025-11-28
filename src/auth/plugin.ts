import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

const secret= process.env.JWT_SECRET!;

export const authPlugin= new Elysia({ name: "auth" })
  .use(
    jwt({
      name: "jwt",
      secret,
      exp: "7d"
    })
  );

export type AuthPlugin= typeof authPlugin;
