import { Icon } from "@amoutonbrady/solid-heroicons";
import { photograph, x } from "@amoutonbrady/solid-heroicons/outline";
import { Component, createEffect, createSignal, Show } from "solid-js";

interface Props extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  onUpload?: (url: string) => unknown;
  value?: string;
}

export const Upload: Component<Props> = (props) => {
  const id = "_" + Math.random().toString(36).substr(2, 9);

  const [url, setUrl] = createSignal("");
  createEffect(() => {
    if (props.value && props.value !== url()) {
      setUrl(props.value);
    }
  });

  const handleUpload = (e: Event & { target: HTMLInputElement }) => {
    const file = e.target.files && e.target.files.length && e.target.files[0];
    if (!file) return;

    const body = new FormData();
    body.append("file", file);

    fetch("http://localhost:5123", { method: "POST", body })
      .then((r) => r.json())
      .then(({ filename }) => setUrl(`http://localhost:5123/${filename}`))
      .catch(console.error);
  };

  const Empty = () => (
    <>
      <input type="file" id={id} class="sr-only" onChange={handleUpload} />
      <Icon path={photograph} outline classList={{ "h-20": true }} />
    </>
  );

  return (
    <label
      for={id}
      class="w-full h-64 bg-gray-100 rounded-lg border-2 border-gray-300 border-dashed flex justify-center items-center transition-colors duration-300 text-gray-300 hover:text-gray-500 relative"
      classList={{ "cursor-pointer": !url() }}
    >
      <Show when={url()} fallback={<Empty />}>
        <div class="h-56 relative">
          <img
            src={url()}
            class="h-full w-auto block relative z-10 rounded-lg"
          />
          <button
            type="button"
            class="h-6 w-6 rounded-full bg-red-300 border-2 border-red-500 text-red-900 flex items-center justify-center absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-20"
            onClick={() => setUrl("")}
          >
            <Icon path={x} outline classList={{ "h-4": true }} />
          </button>
        </div>
      </Show>
    </label>
  );
};
