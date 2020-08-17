import { GraphQLClient } from "graphql-request";
import { getUser, getUsers, createUser, updateUser } from "../../graphql";

export const createUsersEndpoint = (client: GraphQLClient) => ({
  async getAll() {
    try {
      const { users } = await client.request(getUsers);
      return users;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async getOne(id: number) {
    try {
      const { user } = await client.request(getUser, { id });
      return user;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async create(data: UserData) {
    try {
      const { createOneUser } = await client.request(createUser, {
        data,
      });
      return createOneUser;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async update(data: UserData, id: number) {
    try {
      const { updateOneUser } = await client.request(updateUser, {
        data,
        id,
      });
      return updateOneUser;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },
});

interface UserData {
  email: string;
  name: string;
  password?: string;
}
