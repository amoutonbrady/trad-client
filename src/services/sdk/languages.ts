import http from 'redaxios';

export const createLanguagesEndpoint = (client: typeof http) => ({
  async getAll() {
    try {
      const { data: languages } = await client.get('languages');
      return languages;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async getOne(code: string) {
    try {
      const { data: language } = await client.get<{
        language: { code: string; name: string };
      }>(`languages/${code}`);
      return language;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async create(data: LanguageData) {
    try {
      const { data: createOneLanguage } = await client.post('languages', {
        data,
      });
      return createOneLanguage;
    } catch (e) {
      throw new Error('An error happened');
    }
  },

  async update(data: LanguageData, code: string) {
    try {
      const { data: updateOneLanguage } = await client.patch(`languages/${code}`, {
        data,
      });
      return updateOneLanguage;
    } catch (e) {
      throw new Error('An error happened');
    }
  },
});

interface LanguageData {
  code: string;
  name: string;
  rtl?: boolean;
  index?: number;
}
