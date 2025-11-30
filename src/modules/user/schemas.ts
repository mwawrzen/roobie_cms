import { t } from "elysia";

export const USER_ROLES= [ "ADMIN", "MODERATOR", "EDITOR" ] as const;
export type USER_ROLE= typeof USER_ROLES[ number ];

export const CreateUserBodySchema= t.Object({
  email: t.String({ format: "email", error: "Invalid email format" }),
  password: t.String({ minLength: 8, error: "Password must be at least 8 characters" })
});

export const UpdateUserBodySchema= t.Object({
  email: t.Optional( t.String({ format: "email" })),
  password: t.Optional( t.String({ minLength: 8 }))
});

export const LoginUserBodySchema= t.Partial( CreateUserBodySchema );

export const IdParamSchema= t.Object({
  id: t.Numeric()
});

export type CreateUserBody= ( typeof CreateUserBodySchema )[ "static" ];

export type UpdateUserBody= ( typeof UpdateUserBodySchema )[ "static" ];

export type LoginUserBody= ( typeof LoginUserBodySchema )[ "static" ];

export type UserPublic= {
  id: number;
  email: string;
  role: USER_ROLE;
  createdAt: string;
};

export type UserWithPassword= UserPublic& { passwordHash: string };
