import http from 'redaxios';

export const createTranslationsEndpoint = (client: typeof http) => ({
  async create(data: TranslationData) {
    try {
      const { data: createOneTranslation } = await client.post('translations', data);
      return createOneTranslation;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async remove(id: number) {
    try {
      const { data: deleteOneTranslation } = await client.delete(`translations/${id}`);
      return deleteOneTranslation;
    } catch (e) {
      throw new Error('An error happened');
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
