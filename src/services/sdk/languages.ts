import { GraphQLClient } from "graphql-request";
import {
  getLanguages,
  createLanguage,
  getLanguage,
  updateLanguage,
} from "../../graphql";

export const createLanguagesEndpoint = (client: GraphQLClient) => ({
  async getAll() {
    try {
      const { languages } = await client.request(getLanguages);
      return languages;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async getOne(code: string) {
    try {
      const { language } = await client.request<{
        language: { code: string; name: string };
      }>(getLanguage, { code });
      return language;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async create(data: LanguageData) {
    try {
      const { createOneLanguage } = await client.request(createLanguage, {
        data,
      });
      return createOneLanguage;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async update(data: LanguageData, code: string) {
    try {
      const { updateOneLanguage } = await client.request(updateLanguage, {
        data,
        code,
      });
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
