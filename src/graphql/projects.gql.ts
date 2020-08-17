import { gql } from "graphql-request";

export const getProjects = gql`
  query getProjects {
    projects {
      id
      name
      slug
      screenshot
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
      screenshot
    }
  }
`;

export const createProject = gql`
  mutation createProject($data: ProjectCreateInput!) {
    createOneProject(data: $data) {
      id
    }
  }
`;

export const updateProject = gql`
  mutation updateProject($data: ProjectUpdateInput!, $slug: String!) {
    updateOneProject(data: $data, where: { slug: $slug }) {
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
