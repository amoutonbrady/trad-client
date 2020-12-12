import { Component, JSX } from 'solid-js';

type Props = JSX.HTMLAttributes<HTMLHeadingElement> & { center?: boolean };

export const Title: Component<Props> = (props) => {
  const classes = () =>
    ['mb-12', 'text-2xl', 'text-gray-900', 'md:text-3xl', props.class].join(' ');

  return (
    <h1 class={classes()} classList={{ 'text-center': props.center }}>
      {props.children}
    </h1>
  );
};
