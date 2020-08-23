import { Component, createEffect, createResource, createState } from 'solid-js';
import { useRoute, useRouter } from '@rturnq/solid-router';
import { Alert, Button, Input, Page } from '../../components';
import { useSDK } from '../../services/sdk';
import { prevent } from '../../utils';

const LanguageDetails: Component = () => {
  const sdk = useSDK();
  const route = useRoute();
  const router = useRouter();
  const code = route.getParams().code;

  const [language, loadLanguage] = createResource({ name: '', code: '' });
  const [form, setForm] = createState(language());
  loadLanguage(sdk.languages.getOne(code));
  createEffect(() => setForm(language()));

  const [feedback, setFeedback] = createState({ success: false, message: '' });

  const updateLanguage = () => {
    setFeedback({ success: false, message: '' });

    sdk.languages
      .update(form, code)
      .then(() => {
        if (form.code !== code) {
          router.push(`/languages/${form.code}`);
          return;
        }

        loadLanguage(sdk.languages.getOne(code));

        setFeedback({
          success: true,
          message: 'Language updated with success!',
        });
      })
      .catch(({ message }) => {
        setFeedback({ success: false, message });
      });
  };

  return (
    <Page name={`Update the language: ${language().name}`}>
      <Alert show={!!feedback.message} status={feedback.success ? 'success' : 'danger'} withIcon>
        {feedback.message}
      </Alert>

      <form
        onSubmit={prevent(updateLanguage)}
        class="flex flex-col space-y-6"
        classList={{ 'mt-6': !!feedback.message }}
      >
        <Input
          name="name"
          label="Name of the language"
          placeholder="French"
          value={form.name}
          onInput={(e) => setForm('name', e.target.value)}
          loading={language.loading}
          required
          withValidation
        />
        <Input
          name="code"
          label="Code of the language"
          hint="The format expected is 2-digit lowercase country code followed by and underscore followed by 2-digit uppercase region code"
          placeholder="fr_FR"
          minLength={5}
          maxLength={5}
          pattern="[a-z]{2}_[A-Z]{2}"
          value={form.code}
          onInput={(e) => setForm('code', e.target.value)}
          loading={language.loading}
          required
          withValidation
        />

        <Button type="submit" class="ml-auto">
          Update now!
        </Button>
      </form>
    </Page>
  );
};

export default LanguageDetails;
