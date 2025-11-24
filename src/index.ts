import { Elysia } from "elysia";

const PORT= process.env.PORT|| 3000;

const app= new Elysia()
  .get( "/", ()=> "hello." )
  .listen( PORT );

console.log(
  `🚀 Server running at ${ app.server?.hostname }:${ app.server?.port }`
);
