export class ProjectNotFoundError extends Error {

  status= 404;

  constructor() {
    super( "Project not found" );
    this.name= "ProjectNotFoundError";
  }
};
