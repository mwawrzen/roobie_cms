import { UserExistsError } from "@modules/user/errors";
import { registerNewUser } from "@modules/user/service";
import { Elysia, t } from "elysia";

const CreateUserBody= t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 })
});

export const adminRouter= new Elysia({ prefix: "/admin" })
  .post( "/users", async ({ body, set })=> {
    try {
      const newUser= await registerNewUser( body.email, body.password );

      set.status= 201;

      return {
        message: "User created successfully",
        user: { id: newUser.id, email: newUser.email }
      };

    } catch( error ) {

      if( error instanceof UserExistsError ) {
        set.status= 409;
        return {
          error: "Resource confilct",
          message: error.message
        };
      }

      set.status= 500;
      return { error: "Internal server error" };
    }
  }, {
    body: CreateUserBody
  });
