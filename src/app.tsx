import { Component, Switch, Match, Show } from 'solid-js'
import { MatchRoute, NavLink, Redirect } from '@rturnq/solid-router'

import Home from './views/home'
import Login from './views/login'
import { useAuth } from './services/auth'
import { Button } from './components'
import { LanguageIndex } from './views/languages'
import { LanguageNew } from './views/languages/new'
import { LanguageDetails } from './views/languages/details'

const App: Component = () => {
  const [_, { isLoggedIn, logout }] = useAuth()

  return (
    <>
      <Show when={isLoggedIn()}>
        <aside class="h-full w-64 bg-gray-800 text-gray-050 flex flex-col">
          <p class="text-lg font-semibold text-center py-3 bg-gray-900">
            The Translator
          </p>

          <nav class="mt-6">
            <ul class="flex flex-col">
              <li>
                <NavLink
                  href="/"
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                  end
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/projects"
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/languages"
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                >
                  Languages
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/users"
                  class="p-2 rounded-r-full hover:bg-blue-700 block"
                  activeClass="bg-blue-700"
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </nav>

          <Button onClick={logout} status="danger" class="mt-auto">
            Logout
          </Button>
        </aside>
      </Show>

      <main class="flex-1 overflow-auto p-4 md:px-6">
        <Switch fallback={<h1>404</h1>}>
          {/* Stuff to show when logged in */}
          <Match when={isLoggedIn()}>
            <Switch>
              <MatchRoute path="/" end>
                <Home />
              </MatchRoute>
              <MatchRoute path="/languages/new">
                <LanguageNew />
              </MatchRoute>
              <MatchRoute path="/languages/:code">
                <LanguageDetails />
              </MatchRoute>
              <MatchRoute path="/languages">
                <LanguageIndex />
              </MatchRoute>
              <MatchRoute path="/login">
                <Redirect to="/" />
              </MatchRoute>
            </Switch>
          </Match>

          {/* Stuff to show when logged out */}
          <Match when={!isLoggedIn()}>
            <Switch fallback={<Redirect to="/login" />}>
              <MatchRoute path="/login">
                <Login />
              </MatchRoute>
            </Switch>
          </Match>
        </Switch>
      </main>
    </>
  )
}

export default App
