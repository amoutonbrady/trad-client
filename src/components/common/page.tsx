import { Component, Show } from 'solid-js'
import { Title } from './title'

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  name?: string
  center?: boolean
}

export const Page: Component<Props> = (props) => {
  return (
    <div class="container p-4 md:px-6">
      <Show when={props.name}>
        <Title center={props.center}>{props.name}</Title>
      </Show>
      {props.children}
    </div>
  )
}
