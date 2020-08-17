import { gql } from "graphql-request";

export const getLanguages = gql`
  query AllLanguages {
    languages {
      code
      name
      slug
      rtl
      projects {
        id
      }
    }
  }
`;

export const createLanguage = gql`
  mutation CreateLanguage($data: LanguageCreateInput!) {
    createOneLanguage(data: $data) {
      code
    }
  }
`;

export const updateLanguage = gql`
  mutation UpdateLanguage($data: LanguageUpdateInput!, $code: String!) {
    updateOneLanguage(data: $data, where: { code: $code }) {
      code
    }
  }
`;

export const getLanguage = gql`
  query GetLanguage($code: String!) {
    language(where: { code: $code }) {
      code
      name
    }
  }
`;
