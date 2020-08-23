import { Component, Match, Show, Switch } from 'solid-js';
import { Icon } from '@amoutonbrady/solid-heroicons';
import {
  exclamationCircle,
  checkCircle,
  xCircle,
  informationCircle,
  x,
} from '@amoutonbrady/solid-heroicons/outline';

type Props = {
  show: boolean;
  status?: 'success' | 'danger' | 'warning' | 'info' | 'base';
  withIcon?: boolean;
  disposable?: boolean;
  class?: string;
  onDismiss?: () => unknown;
};

export const Alert: Component<Props> = (props) => {
  return () => {
    const baseClasses = [
      props.class,
      'relative',
      'flex',
      'items-center',
      'py-4',
      'pl-6',
      'pr-10',
      'border-2',
      'rounded',
    ];

    switch (props.status) {
      case 'success':
        baseClasses.push('text-green-900', 'bg-green-100', 'border-green-800');
        break;
      case 'warning':
        baseClasses.push('text-orange-900', 'bg-orange-100', 'border-orange-800');
        break;
      case 'danger':
        baseClasses.push('text-red-900', 'bg-red-100', 'border-red-800');
        break;
      case 'base':
        baseClasses.push('text-gray-900', 'bg-gray-100', 'border-gray-800');
        break;
      default:
        baseClasses.push('text-blue-900', 'bg-blue-100', 'border-blue-800');
        break;
    }

    return (
      <Show when={props.show}>
        <div aria-role="alert" class={baseClasses.join(' ')}>
          <Show when={props.disposable}>
            <button type="button" class="absolute top-0 right-0 m-3" onClick={props.onDismiss}>
              <span class="sr-only">Dismiss the alert</span>
              <Icon path={x} class="h-6" />
            </button>
          </Show>

          <Show when={props.withIcon}>
            <Switch fallback={<Icon path={informationCircle} class="hidden w-10 md:block" />}>
              <Match when={props.status === 'success'}>
                <Icon path={checkCircle} class="hidden w-10 md:block" />
              </Match>
              <Match when={props.status === 'danger'}>
                <Icon path={xCircle} class="hidden w-10 md:block" />
              </Match>
              <Match when={props.status === 'warning'}>
                <Icon path={exclamationCircle} class="hidden w-10 md:block" />
              </Match>
            </Switch>
          </Show>

          <p class="flex-1" classList={{ 'md:ml-6': props.withIcon }}>
            {props.children}
          </p>
        </div>
      </Show>
    );
  };
};
