import { Component, createEffect, createResource, createState } from "solid-js";
import { useRoute } from "@rturnq/solid-router";
import { Alert, Button, Input, Page } from "../../components";
import { useSDK } from "../../services/sdk";
import { prevent } from "../../utils";

const UserDetails: Component = () => {
  const sdk = useSDK();
  const route = useRoute();
  const id = Number.parseInt(route.getParams().id, 10);

  const [user, loadUser] = createResource({ name: "", email: "" });
  const [form, setForm] = createState(user());
  loadUser(() => sdk.users.getOne(id));
  createEffect(() => setForm(user()));

  const [feedback, setFeedback] = createState({ success: false, message: "" });

  const updateUser = () => {
    setFeedback({ success: false, message: "" });

    sdk.users
      .update(form, id)
      .then(() => {
        loadUser(() => sdk.users.getOne(id));

        setFeedback({
          success: true,
          message: "User updated with success!",
        });
      })
      .catch(({ message }) => {
        setFeedback({ success: false, message });
      });
  };

  return (
    <Page name={`Update the user: ${user().name}`}>
      <Alert
        show={!!feedback.message}
        status={feedback.success ? "success" : "danger"}
        withIcon
      >
        {feedback.message}
      </Alert>

      <form
        onSubmit={prevent(updateUser)}
        class="flex flex-col space-y-6"
        classList={{ "mt-6": !!feedback.message }}
      >
        <Input
          name="name"
          label="Name of the user"
          placeholder="John Doe"
          value={form.name}
          onInput={(e) => setForm("name", e.target.value)}
          loading={user.loading}
          withValidation
        />
        <Input
          name="email"
          label="Email of the use"
          placeholder="john.doe@gmail.com"
          value={form.email}
          type="email"
          onInput={(e) => setForm("email", e.target.value)}
          loading={user.loading}
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

export default UserDetails;
