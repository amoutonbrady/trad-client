import { Component, Switch, Match, Show, lazy, Suspense } from 'solid-js';
import { MatchRoute, NavLink, Redirect } from '@rturnq/solid-router';

import { Button } from './components';
import { useAuth } from './services/auth';

import Login from './views/login';

const Home = lazy(() => import('./views/home'));

const LanguageIndex = lazy(() => import('./views/languages'));
const LanguageDetails = lazy(() => import('./views/languages/details'));
const LanguageNew = lazy(() => import('./views/languages/new'));

const UsersIndex = lazy(() => import('./views/users'));
const UserDetails = lazy(() => import('./views/users/details'));
const UserNew = lazy(() => import('./views/users/new'));

const ProjectsIndex = lazy(() => import('./views/projects'));
const ProjectId = lazy(() => import('./views/projects/_id'));
const ProjectNew = lazy(() => import('./views/projects/new'));

const ViewNew = lazy(() => import('./views/views/new'));
const ViewDetails = lazy(() => import('./views/views/details'));

const App: Component = () => {
  const [auth, { isLoggedIn, logout }] = useAuth();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Show when={isLoggedIn()}>
        <aside class="h-full w-64 bg-gray-800 text-gray-100 flex flex-col">
          <p class="text-lg font-semibold text-center py-3 bg-gray-900">The Translator</p>

          <nav class="mt-6">
            <ul class="flex flex-col">
              <li>
                <NavLink
                  href=""
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                  end
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="projects"
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="languages"
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                >
                  Languages
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="users"
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </nav>

          <Show when={auth.user}>
            <p class="py-2 px-5 text-sm mt-auto font-bold flex flex-col items-center justify-center">
              <span>Connected as:</span>
              <span>{auth.user.name || auth.user.email}</span>
            </p>
          </Show>
          <Button onClick={logout} status="danger" classList={{ 'mt-auto': auth.user }}>
            Logout
          </Button>
        </aside>
      </Show>

      <main class="flex-1 overflow-auto p-4 md:px-6">
        <Switch fallback={<h1>404</h1>}>
          {/* Stuff to show when logged in */}
          <Match when={isLoggedIn()}>
            <Switch>
              <MatchRoute end>
                <Home />
              </MatchRoute>
              <MatchRoute path="languages/new">
                <LanguageNew />
              </MatchRoute>
              <MatchRoute path="languages/:code">
                <LanguageDetails />
              </MatchRoute>
              <MatchRoute path="languages" end>
                <LanguageIndex />
              </MatchRoute>
              <MatchRoute path="users/new">
                <UserNew />
              </MatchRoute>
              <MatchRoute path="users/:id">
                <UserDetails />
              </MatchRoute>
              <MatchRoute path="users" end>
                <UsersIndex />
              </MatchRoute>
              <MatchRoute path="projects/new">
                <ProjectNew />
              </MatchRoute>
              <MatchRoute path="projects/:project">
                <ProjectId />
              </MatchRoute>
              <MatchRoute path="projects" end>
                <ProjectsIndex />
              </MatchRoute>
              <MatchRoute path="views/new">
                <ViewNew />
              </MatchRoute>
              <MatchRoute path="views/:id">
                <ViewDetails />
              </MatchRoute>
              <MatchRoute path="login">
                <Redirect href="" />
              </MatchRoute>
            </Switch>
          </Match>

          {/* Stuff to show when logged out */}
          <Match when={!isLoggedIn()}>
            <Switch fallback={<Redirect href="login" />}>
              <MatchRoute path="login">
                <Login />
              </MatchRoute>
            </Switch>
          </Match>
        </Switch>
      </main>
    </Suspense>
  );
};

export default App;
