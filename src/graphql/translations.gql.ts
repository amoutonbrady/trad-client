import { gql } from 'graphql-request';

export const createTranslation = gql`
  mutation createTranslation(
    $key: String!
    $x: Float!
    $y: Float!
    $view: Int!
    $languages: [LanguagesOnTranslationsCreateWithoutTranslationInput!]
  ) {
    createOneTranslation(
      data: {
        key: $key
        x: $x
        y: $y
        view: { connect: { id: $view } }
        languages: { create: $languages }
      }
    ) {
      id
    }
  }
`;

export const deleteTranslation = gql`
  mutation deleteTranslation($id: Int!) {
    deleteOneTranslation(where: { id: $id }) {
      id
    }
  }
`;
