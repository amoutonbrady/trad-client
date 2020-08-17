import { gql } from "graphql-request";

export const getUsers = gql`
  query getUsers {
    users {
      id
      email
      name
    }
  }
`;

export const getUser = gql`
  query getUser($id: Int!) {
    user(where: { id: $id }) {
      email
      name
    }
  }
`;

export const createUser = gql`
  mutation createUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      id
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($id: Int!, $data: UserUpdateInput!) {
    updateOneUser(data: $data, where: { id: $id }) {
      id
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($id: Int!) {
    deleteOneUser(where: { id: $id }) {
      id
    }
  }
`;
