import { GraphQLClient } from 'graphql-request';
import { createView, getView, getViews } from '../../graphql/views.gql';

export const createViewsEndpoint = (client: GraphQLClient) => ({
  async getAll(projectSlug: string) {
    try {
      const { views, project } = await client.request(getViews, { project: projectSlug });
      return { views, project };
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async getOne(id: number) {
    try {
      const { view, languages } = await client.request(getView, { id });
      return { view, languages };
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async create(data: ViewData) {
    try {
      const { createOneView } = await client.request(createView, data);
      return createOneView;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  //   async update(data: UserData, id: number) {
  //     try {
  //       const { updateOneUser } = await client.request(updateUser, {
  //         data,
  //         id,
  //       });
  //       return updateOneUser;
  //     } catch ({ response }) {
  //       throw new Error(response.errors[0].message);
  //     }
  //   },
});

interface ViewData {
  name: string;
  screenshot: string;
  project: string;
}
