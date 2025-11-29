import { eq } from "drizzle-orm";
import { db } from "@db";
import { projects } from "@schema";
import { CreateProjectBody, Project } from "@modules/project/schemas";
import { randomUUIDv7 } from "bun";

export async function createProject(
  data: CreateProjectBody
): Promise<Project> {
  const [ newProject ]= await db.insert( projects )
    .values({
      ...data,
      apiKey: randomUUIDv7()
    })
    .returning();
  return newProject;
};

export async function getProjects(): Promise<Project[]> {
  return db.select().from( projects );
};

export async function getProjectById(
  id: number
): Promise<Project| undefined> {
  const project= await db.query.projects.findFirst({
    where: eq( projects.id, id )
  });
  return project;
};

export async function updateProject(
  id: number,
  data: Partial<CreateProjectBody>
) {
  const [ updatedProject ]= await db.update( projects )
    .set( data )
    .where( eq( projects.id, id ))
    .returning();
  return updatedProject;
};

export async function deleteProject( id: number ): Promise<number> {
  const result= await db.delete( projects )
    .where( eq( projects.id, id ))
    .run();
  return ( result as unknown as { changes: number }).changes;
};
