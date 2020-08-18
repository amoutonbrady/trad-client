import { Icon } from "@amoutonbrady/solid-heroicons";
import { eye, eyeOff, check, x } from "@amoutonbrady/solid-heroicons/outline";
import { Component, createState, Show, splitProps } from "solid-js";

type Props = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  withValidation?: boolean;
  loading?: boolean;
  onInput?: (e: Event & { target: HTMLInputElement }) => unknown;
  onChange?: (e: Event & { target: HTMLInputElement }) => unknown;
  onBlur?: (e: Event & { target: HTMLInputElement }) => unknown;
};

export const Input: Component<Props> = (props) => {
  const [internal, external] = splitProps(props, [
    "label",
    "hint",
    "withValidation",
    "loading",
    "onBlur",
  ]);

  const defaultProps: Props = {
    id: "_" + Math.random().toString(36).substr(2, 9),
    type: "text",
  };

  const [state, setState] = createState({
    innerType: props.type || defaultProps.type,
    changed: false,
    valid: true,
    message: "",
  });

  const finalProps = () => ({ ...defaultProps, ...external });

  const togglePasswordType = () => {
    setState("innerType", (type) => (type === "text" ? "password" : "text"));
  };
  const formatValue = (value: any): string => (value ? String(value) : "");

  const handleBlur = (e: Event & { target: HTMLInputElement }) => {
    setState({
      changed: true,
      message: e.target.validationMessage,
      valid: e.target.checkValidity(),
    });
    if (internal.onBlur) internal.onBlur(e);
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
          <Show
            when={finalProps().type === "password" && !finalProps().disabled}
          >
            <button
              type="button"
              aria-roledescription="Change type"
              tabindex="-1"
              classList={{ "mr-4": state.changed }}
              onClick={togglePasswordType}
            >
              <span class="sr-only">View password</span>
              <Icon
                path={state.innerType === "password" ? eye : eyeOff}
                outline
                classList={{ "w-5": true }}
              />
            </button>
          </Show>

          <Show when={internal.withValidation && state.changed}>
            <Icon
              path={state.valid ? check : x}
              outline
              classList={{
                "w-5": true,
                "text-green-600": state.valid,
                "text-red-600": !state.valid,
              }}
            />
          </Show>
        </div>
      </div>

      <Show when={internal.hint}>
        <p class="flex items-center mt-1 text-sm text-gray-700">
          {internal.hint}
        </p>
      </Show>

      <div class="relative bg-white mt-1">
        <Show when={internal.loading}>
          <div class="absolute top-0 left-0 z-20 w-full h-full bg-gray-300 rounded-md animate-pulse"></div>
        </Show>
        <input
          id={finalProps().id}
          value={formatValue(finalProps().value)}
          name={finalProps().name || finalProps().id}
          type={state.innerType}
          min={finalProps().min}
          max={finalProps().max}
          disabled={finalProps().disabled || internal.loading}
          classList={{
            invalid: state.changed && !state.valid,
            "opacity-0": finalProps().loading,
          }}
          v-bind="{ ...$attrs, ...ariaInput }"
          class="relative  border-gray-400 w-full z-10 px-4 py-2 border rounded-md focus:outline-none focus:shadow-outline disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-500"
          {...finalProps()}
          onBlur={handleBlur}
        />
      </div>
      <Show when={internal.withValidation && !state.valid && state.message}>
        <p class="flex items-center mt-1 text-sm text-red-700">
          {state.message}
        </p>
      </Show>
    </div>
  );
};
