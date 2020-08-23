import { GraphQLClient } from 'graphql-request';
import { createTranslation, deleteTranslation } from '../../graphql';

export const createTranslationsEndpoint = (client: GraphQLClient) => ({
  async create(data: TranslationData) {
    try {
      const { createOneTranslation } = await client.request(createTranslation, data);
      return createOneTranslation;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },

  async remove(id: number) {
    try {
      const { deleteOneTranslation } = await client.request(deleteTranslation, { id });
      return deleteOneTranslation;
    } catch ({ response }) {
      throw new Error(response.errors[0].message);
    }
  },
});

export interface TranslationData {
  key: string;
  x: number;
  y: number;
  view: number;
  languages: { value: string; language: { connect: { code: string } } }[];
}
