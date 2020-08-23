import { Link, useRoute } from '@rturnq/solid-router';
import { Component, createResource, For } from 'solid-js';
import { Button, Page } from '../../components';
import { useSDK } from '../../services/sdk';

const ProjectId: Component = () => {
  const sdk = useSDK();
  const route = useRoute();
  const slug = route.getParams().project;
  const [views, loadViews] = createResource({ views: [], project: {} as any });
  loadViews(sdk.views.getAll(slug));

  const noViews = <p>No pages for this project yet</p>;

  return (
    <Page name={`Project: ${views().project.name}`}>
      <Button href={`/views/new?project=${views().project.slug}`} component={Link}>
        Add a page
      </Button>

      <section class="grid grid-cols-3 gap-6 py-6">
        <For each={views().views} fallback={noViews}>
          {(view) => (
            <article>
              <img src={view.screenshot} />
              <Link href={`/views/${view.id}`}>{view.name}</Link>
            </article>
          )}
        </For>
      </section>
    </Page>
  );
};

export default ProjectId;
