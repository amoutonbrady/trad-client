import { render } from 'solid-js/web';
import { Router, pathIntegration } from '@rturnq/solid-router';

import App from './app';
import { ServiceProvider } from './services';

export const rootEl = document.getElementById('root');

export const dispose = render(
  () => (
    <Router integration={pathIntegration()}>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </Router>
  ),
  rootEl,
);

// HMR
// if (module.hot) {
//   module.hot.dispose(() => {
//     dispose();
//     rootEl.textContent = '';
//   });

//   module.hot.accept();
// }
