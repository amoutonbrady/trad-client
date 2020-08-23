import { render } from 'solid-js/dom';
import { requestCallback } from 'solid-js';
import { RouterProvider, browserPathRouting } from '@rturnq/solid-router';
requestCallback(() => {});

import App from './app';
import { ServiceProvider } from './services';

export const rootEl = document.getElementById('root');
export const dispose = render(
  () => (
    <RouterProvider handler={browserPathRouting()}>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </RouterProvider>
  ),
  rootEl,
);

// HMR
if (module.hot) {
  module.hot.dispose(() => {
    dispose();
    rootEl.textContent = '';
  });

  module.hot.accept();
}
