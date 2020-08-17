import { gql } from "graphql-request";

export const getProjects = gql`
  query getProjects {
    projects {
      id
      name
      slug
      screenshot
      languages {
        code
      }
      views {
        id
      }
    }
  }
`;

export const getProject = gql`
  query getProject($slug: String!) {
    project(where: { slug: $slug }) {
      name
      slug
      languages {
        code
        name
      }
      screenshot
    }
  }
`;

export const createProject = gql`
  mutation createProject(
    $name: String!
    $userId: Int!
    $languages: [LanguageWhereUniqueInput!]
  ) {
    createOneProject(
      data: {
        name: $name
        users: { connect: { id: $userId } }
        languages: { connect: $languages }
      }
    ) {
      id
    }
  }
`;

export const updateProject = gql`
  mutation updateProject(
    $slug: String!
    $name: String!
    $languages: [LanguageWhereUniqueInput!]
  ) {
    updateOneProject(
      data: { name: $name, languages: { connect: $languages } }
      where: { slug: $slug }
    ) {
      id
    }
  }
`;

export const deleteProject = gql`
  mutation deleteProject($slug: String!) {
    deleteOneProject(where: { slug: $slug }) {
      id
    }
  }
`;
