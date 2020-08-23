import { useRouter } from '@rturnq/solid-router';
import { Component, createState } from 'solid-js';
import { Alert, Button, Input, Page } from '../../components';
import { Upload } from '../../components/form/upload';
import { useSDK } from '../../services/sdk';
import { prevent } from '../../utils';

const ViewNew: Component = () => {
  const sdk = useSDK();
  const router = useRouter();
  const project = router.query().project || router.query()['?project'];
  const [form, setForm] = createState({ name: '', screenshot: '', project });
  const [feedback, setFeedback] = createState({ success: false, message: '' });

  const createView = () => {
    setFeedback({ success: false, message: '' });

    sdk.views
      .create(form)
      .then(() => {
        setForm({ name: '', screenshot: '', project });
        setFeedback({
          success: true,
          message: 'View added with success!',
        });
      })
      .catch(({ message }) => {
        setFeedback({ success: false, message });
      });
  };

  return (
    <Page name={`New page for ${project}`}>
      <Alert show={!!feedback.message} status={feedback.success ? 'success' : 'danger'} withIcon>
        {feedback.message}
      </Alert>

      <form
        onSubmit={prevent(createView)}
        class="flex flex-col space-y-6"
        classList={{ 'mt-6': !!feedback.message }}
      >
        <Upload
          label="Screenshot of the page"
          value={form.screenshot}
          onUpload={(screen) => setForm('screenshot', screen)}
        />
        <Input
          label="Name of the page"
          name="name"
          value={form.name}
          onInput={(e) => setForm('name', e.target.value)}
          withValidation
          required
        />
        <Button type="submit" class="ml-auto">
          Create now!
        </Button>
      </form>
    </Page>
  );
};

export default ViewNew;
