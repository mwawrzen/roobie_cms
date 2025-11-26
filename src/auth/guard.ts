import { Elysia } from "elysia";
import { authConfig } from "@auth/config";

export const authGuard= ( app: Elysia )=> app
  .use( authConfig )
  .on( "beforeHandle", async ({ jwt, set, headers })=> {
    const authHeader= headers[ "authorization" ];
    if( !authHeader|| !authHeader.startsWith( "Bearer " )) {
      set.status= 401;
      return { error: "Missing or invalid authorization header" };
    }
    const token= authHeader.substring( 7 );
    const profile= await jwt.verify( token );

    if( !profile ) {
      set.status= 401;
      return { error: "Invalid or expired token" };
    }
  });
