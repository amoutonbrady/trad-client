import { Component, createResource, For, Show, Suspense } from "solid-js";
import { Link } from "@rturnq/solid-router";
import { Button, Page } from "../../components";
import { useSDK } from "../../services/sdk";
import { Icon } from "@amoutonbrady/solid-heroicons";
import { arrowRight } from "@amoutonbrady/solid-heroicons/outline";
import { useAuth } from "../../services/auth";

const UsersIndex: Component = () => {
  const sdk = useSDK();
  const [auth] = useAuth();
  const [users, loadUsers] = createResource([]);
  loadUsers(() => sdk.users.getAll());

  return (
    <Page name="List of users">
      <Button href="/users/new" component={Link}>
        Add a new user
      </Button>

      <section class="mt-6">
        <Suspense fallback={<span>Loading...</span>}>
          <ul class="flex flex-col">
            <For each={users()} fallback={<p>No users for the moment</p>}>
              {(user, i) => (
                <li
                  class="border-dashed border-gray-200 py-1"
                  classList={{ "border-t-2": i() > 0 }}
                >
                  <Link
                    href={`/users/${user.id}`}
                    class="flex justify-between items-center group p-4 md:px-6 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                  >
                    <p class="flex items-center space-x-4">
                      <span>#{user.id} - </span>
                      <span class="font-semibold">
                        {user.name}
                        <br />
                        {user.email}
                      </span>
                      <Show when={auth.user && user.id === auth.user.id}>
                        <sup>(you)</sup>
                      </Show>
                    </p>
                    <button
                      type="button"
                      class="transform transition-transform duration-300 group-hover:translate-x-2"
                    >
                      <Icon path={arrowRight} class="w-6" />
                    </button>
                  </Link>
                </li>
              )}
            </For>
          </ul>
        </Suspense>
      </section>
    </Page>
  );
};

export default UsersIndex;
