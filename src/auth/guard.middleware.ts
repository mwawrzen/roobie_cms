import { Elysia } from "elysia";
import { authJwtPlugin } from "@auth/jwt.plugin";
import { getUserById } from "@modules/user/repository";
import { AuthenticatedUser } from "@modules/user/schemas";

export const authGuard= ( app: Elysia )=> app
  .use( authJwtPlugin )
  .resolve( async ({ jwt, set, cookie: { auth }}) => {

    const token= auth.value;

    if( !token )
      return { user: null };

    try {
      const payload= await jwt.verify( token as string );

      if( !payload|| !payload.userId )
        return { user: null };

      const dbUser= await getUserById( Number( payload.userId ));

      if( !dbUser )
        return { user: null };

      const user: AuthenticatedUser= {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
        createdAt: dbUser.createdAt
      };

      return { user };
    } catch( e ) {
      return { user: null };
    }
  })
  .onBeforeHandle(({ set, user })=> {
    if( !user ) {
      set.status= 401;
      return { error: "Unauthorized" };
    }
  });
