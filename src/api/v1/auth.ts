import { Elysia } from "elysia";
import { authJwtPlugin } from "@/src/auth/jwt.plugin";
import { validateUser } from "@modules/user/service";
import { LoginBodySchema } from "@modules/user/schemas";

export const authRouter= ( app: Elysia )=> app
  .use( authJwtPlugin )
  .post( "/login", async ({ body, jwt, set, cookie: { auth }})=> {

    const { email, password }= body;

    const user= await validateUser( email, password );

    if( !user ) {
      set.status= 401;
      return { error: "Invalid login data" };
    }

    const token= await jwt.sign({
      userId: user.id,
      email: user.email
    });

    auth.set({
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV=== "production",
      maxAge: 60* 60,
      path: "/"
    });

    set.status= 200;

    return {
      message: "Login successfull",
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }, {
    body: LoginBodySchema
  })
  .get( "/logout", ({ cookie: { auth }})=> {
    auth.remove();
    return { message: "Successfully logged out" };
  });
