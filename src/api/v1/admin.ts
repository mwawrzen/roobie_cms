import { Elysia } from "elysia";
import { UserExistsError, UserNotFoundError } from "@modules/user/errors";
import { ProjectNotFoundError } from "@/src/modules/project/errors";
import { registerNewUser } from "@modules/user/service";
import { LoginBodySchema } from "@modules/user/schemas";
import {
  deleteUser,
  getSafeUserById,
  getUsers
} from "@modules/user/repository";
import {
  CreateProjectBodySchema,
  UpdateProjectBodySchema
} from "@modules/project/schemas";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject
} from "@modules/project/repository";

export const adminRouter= new Elysia()
  .group( "/user", app=> app
    .get( "/", async ({ set })=> {
      try {
        const users= await getUsers();
        return { users };
      } catch( error ) {
        set.status= 500;
        return { error: "Failed to retrieve user list" };
      }
    })
    .get( "/:id", async ({ params })=> {
      const id= Number( params.id );

      const user= await getSafeUserById( id );

      if( !user )
        throw new UserNotFoundError();

      return { user };
    })
    .post( "/", async ({ body, set })=> {
      try {
        const { id, email, createdAt }= await registerNewUser(
          body.email,
          body.password
        );

        set.status= 201;

        return {
          message: "User created successfully",
          user: { id, email, createdAt }
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
      body: LoginBodySchema
    })
    .delete( "/:id", async ({ params, set, user }: any)=> {
      const id= Number( params.id );

      if( user&& user.id=== id ) {
        set.status= 403;
        return { error: "Admin cannot delete their own account via this endpoint" };
      }

      const deletedCount= await deleteUser( id );

      if( deletedCount=== 0 )
        throw new UserNotFoundError();

      set.status= 200;
      return { message: "User successfully deleted" };
    })
  )
  .group( "/project", app=> app
    .post( "/", async ({ body, set })=> {
      const newProject= await createProject( body );

      set.status= 201;
      return {
        message: "Project created successfully",
        project: newProject
      };
    }, {
      body: CreateProjectBodySchema
    })
    .get( "/", async ()=> {
      const projects= await getProjects();
      return projects;
    })
    .get( "/:id", async ({ params })=> {
      const id= Number( params.id );
      const project= await getProjectById( id );

      if( !project )
        throw new ProjectNotFoundError();

      return { project };
    })
    .patch( "/:id", async ({ params, body, set }) => {
      const id= Number( params.id );
      const updatedProject= await updateProject( id, body );

      if( !updatedProject )
        throw new ProjectNotFoundError();

      set.status= 200;
      return {
        message: "Project successfully updated",
        project: updatedProject
      };
    }, {
      body: UpdateProjectBodySchema
    })
    .delete( "/:id", async ({ params, set })=> {
      const id= Number( params.id );
      const deletedCount= await deleteProject( id );

      if( deletedCount=== 0 )
        throw new ProjectNotFoundError();

      set.status= 200;
      return { message: "Project successfully deleted" };
    })
  );
