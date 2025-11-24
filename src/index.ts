import { Elysia } from "elysia";
import { drizzle } from "drizzle-orm/bun-sqlite";

const PORT= process.env.PORT!;

const app= new Elysia()
  .get( "/", ()=> "hello." )
  .listen( PORT );

console.log(
  `🚀 Server running at ${ app.server?.hostname }:${ app.server?.port }`
);
