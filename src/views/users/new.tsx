import { Component, createState } from 'solid-js';
import { Alert, Button, Input, Page } from '../../components';
import { useSDK } from '../../services/sdk';
import { prevent } from '../../utils';

const UserNew: Component = () => {
  const sdk = useSDK();

  const [form, setForm] = createState({ name: '', email: '', password: '' });
  const [feedback, setFeedback] = createState({ success: false, message: '' });

  const createUser = () => {
    setFeedback({ success: false, message: '' });

    sdk.users
      .create(form)
      .then(() => {
        setForm({ name: '', email: '', password: '' });
        setFeedback({
          success: true,
          message: 'User created with success!',
        });
      })
      .catch(({ message }) => {
        setFeedback({ success: false, message });
      });
  };

  return (
    <Page name="Add a new user">
      <Alert show={!!feedback.message} status={feedback.success ? 'success' : 'danger'} withIcon>
        {feedback.message}
      </Alert>

      <form
        onSubmit={prevent(createUser)}
        class="flex flex-col space-y-6"
        classList={{ 'mt-6': !!feedback.message }}
      >
        <Input
          name="name"
          label="Name of the user"
          placeholder="John Doe"
          value={form.name}
          onInput={(e) => setForm('name', e.target.value)}
          required
          withValidation
        />
        <Input
          name="email"
          label="Email of the user"
          type="email"
          placeholder="john.doe@gmail.com"
          value={form.email}
          onInput={(e) => setForm('email', e.target.value)}
          required
          withValidation
        />
        <Input
          name="password"
          label="Password of the user"
          placeholder="**********"
          type="password"
          hint="Once saved the password is hashed."
          value={form.password}
          onInput={(e) => setForm('password', e.target.value)}
          minLength={6}
          required
          withValidation
        />

        <Button type="submit" class="ml-auto">
          Create now!
        </Button>
      </form>
    </Page>
  );
};

export default UserNew;
