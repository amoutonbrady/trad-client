import { Icon } from '@amoutonbrady/solid-heroicons';
import { check, x } from '@amoutonbrady/solid-heroicons/outline';
import { Component, createEffect, createState, Show, splitProps, JSX } from 'solid-js';

type Props = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  withValidation?: boolean;
  loading?: boolean;
  onChange?: (e: Event & { target?: HTMLSelectElement; value?: string }) => unknown;
  placeholder?: string;
};

export const Select: Component<Props> = (props) => {
  const [internal, external] = splitProps(props, [
    'label',
    'hint',
    'withValidation',
    'loading',
    'onChange',
    'placeholder',
  ]);

  const defaultProps: Props = {
    id: '_' + Math.random().toString(36).substr(2, 9),
  };

  const [state, setState] = createState({
    changed: false,
    valid: true,
    message: '',
  });

  createEffect(() => console.log(external.value));

  const finalProps = () => ({ ...defaultProps, ...external });
  const formatValue = (value: any): string => (value ? String(value) : '');

  const handleChange = (e: Event & { target: HTMLSelectElement }) => {
    setState({
      changed: true,
      message: e.target.validationMessage,
      valid: e.target.checkValidity(),
    });

    if (internal.onChange) {
      const value = Array.from(e.target.options)
        .filter((o) => o.selected)
        .map((o) => o.value || o.textContent)
        .join(',');

      internal.onChange({ ...e, value });
    }
  };

  return (
    <div class="flex text-gray-800 flex-col justify-end">
      <div class="flex items-center justify-between">
        <Show when={internal.label}>
          <label for={finalProps().id} class="font-semibold cursor-pointer">
            {internal.label}
          </label>
        </Show>

        <div class="flex items-center">
          <Show when={internal.withValidation && state.changed}>
            <Icon
              path={state.valid ? check : x}
              class="w-5"
              classList={{
                'text-green-600': state.valid,
                'text-red-600': !state.valid,
              }}
            />
          </Show>
        </div>
      </div>

      <Show when={internal.hint}>
        <p class="flex items-center mt-1 text-sm text-gray-700">{internal.hint}</p>
      </Show>

      <div class="relative bg-white mt-1">
        <Show when={internal.loading}>
          <div class="absolute top-0 left-0 z-20 w-full h-full bg-gray-300 rounded-md animate-pulse"></div>
        </Show>
        <select
          id={finalProps().id}
          value={formatValue(finalProps().value)}
          name={finalProps().name || finalProps().id}
          disabled={finalProps().disabled || internal.loading}
          classList={{
            invalid: state.changed && !state.valid,
            'opacity-0': finalProps().loading,
          }}
          class="relative border-gray-400 w-full z-10 px-4 py-2 border rounded-md focus:outline-none focus:shadow-outline disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-500"
          {...finalProps()}
          onChange={handleChange}
        >
          <Show when={internal.placeholder}>
            <option disabled>{internal.placeholder}</option>
          </Show>
          {props.children}
        </select>
      </div>
      <Show when={internal.withValidation && !state.valid && state.message}>
        <p class="flex items-center mt-1 text-sm text-red-700">{state.message}</p>
      </Show>
    </div>
  );
};
