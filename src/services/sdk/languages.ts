import { GraphQLClient } from "graphql-request";
import {
  allLanguagesQuery,
  createLanguageMutation,
  oneLanguageQuery,
  updateLanguageMutation,
} from "../../graphql";

export const createLanguagesEndpoint = (client: GraphQLClient) => ({
  async getAll() {
    try {
      const { languages } = await client.request(allLanguagesQuery);
      return languages;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async getOne(code: string) {
    try {
      const { language } = await client.request<{
        language: { code: string; name: string };
      }>(oneLanguageQuery, { code });
      return language;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async createLanguage(data: LanguageData) {
    try {
      const { createOneLanguage } = await client.request(
        createLanguageMutation,
        { data }
      );
      return createOneLanguage;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async updateLanguage(data: LanguageData, code: string) {
    try {
      const { updateOneLanguage } = await client.request(
        updateLanguageMutation,
        { data, code }
      );
      return updateOneLanguage;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },
});

interface LanguageData {
  code: string;
  name: string;
  rtl?: boolean;
  index?: number;
}
