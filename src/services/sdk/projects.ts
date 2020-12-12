import http from 'redaxios';

export const createProjectsEndpoint = (client: typeof http) => ({
  async getAll() {
    try {
      const { data: projects } = await client.get('projects');
      return projects;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async getOne(id: string) {
    try {
      const { data: project } = await client.get(`projects/${id}`);
      return project;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async create(data: ProjectData) {
    try {
      const { data: createOneProject } = await client.post('projects', data);
      return createOneProject;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async update(data: ProjectData, id: string) {
    try {
      const { data: updateOneProject } = await client.patch(`projects/${id}`, data);
      return updateOneProject;
    } catch (e) {
      throw new Error('An error happened');
    }
  },
});

interface ProjectData {
  languages: { code: string }[];
  name: string;
  screenshot?: string;
  userId: number;
}
