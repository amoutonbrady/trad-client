import { gql } from 'graphql-request';

export const getViews = gql`
  query getViews($project: String!) {
    project(where: { slug: $project }) {
      name
      slug
    }
    views(where: { project: { slug: { equals: $project } } }) {
      id
      index
      name
      slug
      screenshot
    }
  }
`;

export const getView = gql`
  query getView($id: Int!) {
    languages(where: { translations: { every: { translation: { viewId: { equals: $id } } } } }) {
      name
      code
    }
    view(where: { id: $id }) {
      id
      index
      name
      slug
      screenshot
      translation {
        id
        index
        key
        label
        x
        y
        languages {
          language {
            code
            name
          }
          value
        }
      }
    }
  }
`;

export const createView = gql`
  mutation createView($project: String!, $name: String!, $screenshot: String!) {
    createOneView(
      data: { name: $name, screenshot: $screenshot, project: { connect: { slug: $project } } }
    ) {
      id
    }
  }
`;
