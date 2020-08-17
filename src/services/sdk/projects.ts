import { GraphQLClient } from "graphql-request";
import {
  getProject,
  getProjects,
  createProject,
  updateProject,
} from "../../graphql";

export const createProjectsEndpoint = (client: GraphQLClient) => ({
  async getAll() {
    try {
      const { projects } = await client.request(getProjects);
      return projects;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async getOne(slug: string) {
    try {
      const { project } = await client.request(getProject, { slug });
      return project;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async create(data: ProjectData) {
    try {
      const { createOneProject } = await client.request(createProject, data);
      return createOneProject;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async update(data: ProjectData, slug: string) {
    try {
      const { updateOneProject } = await client.request(updateProject, {
        ...data,
        slug,
      });
      return updateOneProject;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },
});

interface ProjectData {
  languages: { code: string }[];
  name: string;
  screenshot?: string;
}
