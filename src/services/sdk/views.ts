import http from 'redaxios';

export const createViewsEndpoint = (client: typeof http) => ({
  async getAll(projectSlug: string) {
    try {
      const { data: views } = await client.get('views', { params: { project: projectSlug } });
      return views;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async getOne(id: number) {
    try {
      const { data: view } = await client.get(`views/${id}`);
      return { view };
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async create(data: ViewData) {
    try {
      const { data: createOneView } = await client.post('views', data);
      return createOneView;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  //   async update(data: UserData, id: number) {
  //     try {
  //       const { updateOneUser } = await client.request(updateUser, {
  //         data,
  //         id,
  //       });
  //       return updateOneUser;
  //     } catch (e) {
  //       throw new Error('An error happened');
  //     }
  //   },
});

interface ViewData {
  name: string;
  screenshot: string;
  project: string;
}
