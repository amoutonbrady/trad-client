import http from 'redaxios';

export const createUsersEndpoint = (client: typeof http) => ({
  async getAll() {
    try {
      const { data: users } = await client.get('users');
      return users;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async getOne(id: number) {
    try {
      const { data: user } = await client.get(`users/${id}`);
      return user;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async create(data: UserData) {
    try {
      const { data: createOneUser } = await client.post('users', { ...data, role: 'ADMIN' });
      return createOneUser;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async update(id: number, data: UserData) {
    try {
      // @ts-ignore
      const { data: updateOneUser } = await client.request(`users/${id}`, undefined, 'PATCH', data);
      return updateOneUser;
    } catch (e) {
      throw new Error('An error happened');
    }
  },
});

interface UserData {
  email: string;
  name: string;
  password?: string;
}
