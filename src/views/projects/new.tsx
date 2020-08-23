import { Component, createResource, createState, For, unwrap } from 'solid-js';
import { Alert, Button, Input, Page, Select } from '../../components';
import { Upload } from '../../components/form/upload';
import { useAuth } from '../../services/auth';
import { useSDK } from '../../services/sdk';
import { prevent } from '../../utils';

const ProjectNew: Component = () => {
  const sdk = useSDK();
  const [auth] = useAuth();

  const [form, setForm] = createState({ name: '', screenshot: '', languages: [] });
  const [feedback, setFeedback] = createState({ success: false, message: '' });
  const [languages, loadLanguages] = createResource([]);
  loadLanguages(sdk.languages.getAll());

  const createProject = () => {
    setFeedback({ success: false, message: '' });

    sdk.projects
      .create({ ...form, userId: auth.user.id })
      .then(() => {
        setForm({ name: '', screenshot: '', languages: [] });
        setFeedback({
          success: true,
          message: 'Project created with success!',
        });
      })
      .catch(({ message }) => {
        setFeedback({ success: false, message });
      });
  };

  return (
    <Page name="Add a new project">
      <Alert show={!!feedback.message} status={feedback.success ? 'success' : 'danger'} withIcon>
        {feedback.message}
      </Alert>

      <form
        onSubmit={prevent(createProject)}
        class="flex flex-col space-y-6"
        classList={{ 'mt-6': !!feedback.message }}
      >
        <Upload
          onUpload={(screenshot) => setForm('screenshot', screenshot)}
          value={form.screenshot}
        />
        <Input
          name="name"
          label="Name of the project"
          placeholder="Ticket Mobile"
          value={form.name}
          onInput={(e) => setForm('name', e.target.value)}
          required
          withValidation
        />
        <Select
          name="languages[]"
          label="Languages available for this project"
          hint="Press CTRL + click to select multiple langauges"
          onChange={(e) =>
            setForm(
              'languages',
              e.value.split(',').map((l) => ({ code: l })),
            )
          }
          size={languages().length}
          multiple
          required
          withValidation
        >
          <For each={languages()}>
            {(lang) => (
              <option
                selected={!!form.languages.find((l) => l.code === lang.code)}
                value={lang.code}
              >
                {lang.name}
              </option>
            )}
          </For>
        </Select>

        <Button type="submit" class="ml-auto">
          Create now!
        </Button>
      </form>
    </Page>
  );
};

export default ProjectNew;
