import { gql } from "graphql-request";

export const allLanguagesQuery = gql`
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

export const createLanguageMutation = gql`
  mutation CreateLanguage($data: LanguageCreateInput!) {
    createOneLanguage(data: $data) {
      code
    }
  }
`;

export const updateLanguageMutation = gql`
  mutation UpdateLanguage($data: LanguageUpdateInput!, $code: String!) {
    updateOneLanguage(data: $data, where: { code: $code }) {
      code
    }
  }
`;

export const oneLanguageQuery = gql`
  query GetLanguage($code: String!) {
    language(where: { code: $code }) {
      code
      name
    }
  }
`;
