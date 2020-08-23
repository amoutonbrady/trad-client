import { Component, createResource, For, Suspense } from 'solid-js';
import { Link } from '@rturnq/solid-router';
import { Button, Page } from '../../components';
import { useSDK } from '../../services/sdk';
import { Icon } from '@amoutonbrady/solid-heroicons';
import { arrowRight } from '@amoutonbrady/solid-heroicons/outline';

const ProjectsIndex: Component = () => {
  const sdk = useSDK();
  const [projects, loadProjects] = createResource([]);
  loadProjects(sdk.projects.getAll());

  return (
    <Page name="List of projects available">
      <Button href="/projects/new" component={Link}>
        Add a new project
      </Button>

      <section class="mt-6">
        <Suspense fallback={<span>Loading...</span>}>
          <ul class="flex flex-col">
            <For each={projects()} fallback={<p>No projects for the moment</p>}>
              {(project, i) => (
                <li
                  class="border-dashed border-gray-200 py-1"
                  classList={{ 'border-t-2': i() > 0 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    class="flex justify-between items-center group p-4 md:px-6 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                  >
                    <p>
                      <span class="font-semibold">{project.name}&nbsp;</span>
                    </p>
                    <button
                      type="button"
                      class="transform transition-transform duration-300 group-hover:translate-x-2"
                    >
                      <Icon path={arrowRight} class="w-6" />
                    </button>
                  </Link>
                </li>
              )}
            </For>
          </ul>
        </Suspense>
      </section>
    </Page>
  );
};

export default ProjectsIndex;
