import { Component, createSignal, createState, unwrap } from 'solid-js';
import { useRouter } from '@rturnq/solid-router';
import { Alert, Button, Input, Page } from '../components';
import { useAuth } from '../services/auth';

const Login: Component = () => {
  const router = useRouter();
  const [auth, { login }] = useAuth();
  const [loading, setLoading] = createSignal(false);
  const [form, setForm] = createState({ email: '', password: '' });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setLoading(true);

    const data = unwrap<{ email: string; password: string }>(form);

    login(data)
      .then(() => router.push('/'))
      .finally(() => setLoading(false));
  };

  return (
    <Page name="The Translator" center>
      <form onSubmit={handleSubmit} class="flex flex-col mx-auto space-y-4 max-w-lg p-4 md:px-6">
        <Alert show={!!auth.error} status="danger" withIcon>
          {auth.error}
        </Alert>

        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Hello"
          withValidation
          value={form.email}
          disabled={loading()}
          required
          onInput={(e) => setForm('email', e.target.value)}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Hello"
          value={form.password}
          minLength={2}
          disabled={loading()}
          withValidation
          required
          onInput={(e) => setForm('password', e.target.value)}
        />

        <Button type="submit" class="ml-auto" loading={loading()}>
          login
        </Button>
      </form>
    </Page>
  );
};

export default Login;
