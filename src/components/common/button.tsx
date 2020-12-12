import { Component, Show, splitProps, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { LinkProps } from '@rturnq/solid-router';
import { Icon } from '@amoutonbrady/solid-heroicons';
import { dotsHorizontal } from '@amoutonbrady/solid-heroicons/outline';

type Props = Partial<LinkProps> &
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    component?: string | Component;
    status?: 'danger' | 'warning' | 'success' | 'info' | 'base';
    outline?: boolean;
  };

export const Button: Component<Props> = (props) => {
  const [internal, external] = splitProps(props, [
    'class',
    'loading',
    'status',
    'outline',
    'children',
  ]);

  const finalProps = () => ({
    ...external,
    component:
      external.disabled || internal.loading || !external.component ? 'button' : external.component,
    disabled: external.disabled || internal.loading,
  });

  const finalClass = () => {
    const baseClasses = [
      internal.class,
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'inline-flex',
      'justify-center',
      'items-center',
      'py-2',
      'text-sm',
      'font-semibold',
      'tracking-wide',
      'uppercase',
      'rounded',
      'cursor-pointer',
      'border',
      'transition',
      'duration-300',
      'transition-color',
    ];

    const status = internal.status || 'info';

    if (status !== 'base') baseClasses.push('shadow');

    if (internal.outline) {
      baseClasses.push('border', 'hover:text-gray-100');

      switch (status) {
        case 'base':
          break;
        case 'danger':
          baseClasses.push(
            'px-5',
            'text-red-700',
            'border-red-700',
            'hover:bg-red-700',
            'active:bg-red-800',
          );
          break;
        case 'info':
          baseClasses.push(
            'px-5',
            'text-blue-700',
            'border-blue-700',
            'hover:bg-blue-700',
            'active:bg-blue-800',
          );
          break;
        case 'warning':
          baseClasses.push(
            'px-5',
            'text-yellow-700',
            'border-yellow-700',
            'hover:bg-yellow-700',
            'active:bg-yellow-800',
          );
          break;
        case 'success':
          baseClasses.push(
            'px-5',
            'text-green-700',
            'border-green-700',
            'hover:bg-green-700',
            'active:bg-green-800',
          );
          break;
        default:
          baseClasses.push(
            'px-5',
            'text-gray-800',
            'border-gray-800',
            'hover:bg-gray-800',
            'active:bg-gray-900',
          );
          break;
      }
    } else {
      switch (status) {
        case 'base':
          baseClasses.push('border-transparent');
          break;
        case 'danger':
          baseClasses.push(
            'px-5',
            'bg-red-700',
            'border-red-700',
            'text-gray-100',
            'hover:bg-red-800',
            'active:bg-red-800',
          );
          break;
        case 'info':
          baseClasses.push(
            'px-5',
            'bg-blue-700',
            'border-blue-700',
            'text-gray-100',
            'hover:bg-blue-800',
            'active:bg-blue-800',
          );
          break;
        case 'warning':
          baseClasses.push(
            'px-5',
            'bg-yellow-700',
            'border-yellow-700',
            'text-gray-100',
            'hover:bg-yellow-800',
            'active:bg-yellow-800',
          );
          break;
        case 'success':
          baseClasses.push(
            'px-5',
            'bg-green-700',
            'border-green-700',
            'text-gray-100',
            'hover:bg-green-800',
            'active:bg-green-800',
          );
          break;
        default:
          baseClasses.push(
            'px-5',
            'bg-gray-800',
            'border-gray-800',
            'text-gray-100',
            'hover:bg-gray-900',
            'active:bg-gray-black',
          );
          break;
      }
    }

    return baseClasses.join(' ');
  };

  return () => {
    return (
      // @ts-ignore
      <Dynamic {...finalProps()} class={finalClass()}>
        {internal.children}

        <Show when={internal.loading}>
          <Icon path={dotsHorizontal} class="'w-6 ml-1 animate-pulse" />
        </Show>
      </Dynamic>
    );
  };
};
