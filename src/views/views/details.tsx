import { Icon } from '@amoutonbrady/solid-heroicons';
import { trash, upload } from '@amoutonbrady/solid-heroicons/outline';
import { useRoute } from '@rturnq/solid-router';
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  createState,
  For,
  Show,
} from 'solid-js';
import { Alert, Button, Input, Page } from '../../components';
import { useSDK } from '../../services/sdk';
import { TranslationData } from '../../services/sdk/translations';
import { prevent } from '../../utils';
import { round } from '../../utils/round';

const ViewDetails: Component = () => {
  const sdk = useSDK();
  const route = useRoute();
  const viewId = route.getParams().id;

  let newTranslationInput: HTMLInputElement;
  const [newTranslationForm, setNewTranslationForm] = createState<
    Pick<TranslationData, 'key' | 'languages'>
  >({ key: '', languages: [] });

  const [coords, setCoords] = createSignal<{ x: number; y: number } | null>(null);
  const [form, setForm] = createState({ name: '', screenshot: '', translations: [] });
  const [feedback, setFeedback] = createState({ success: false, message: '' });
  const [data, loadData] = createResource({ view: {} as any, languages: [] });

  loadData(sdk.views.getOne(+viewId));
  createEffect(() =>
    setForm({
      name: data().view.name,
      screenshot: data().view.screenshot,
      translations: data().view.translation,
    }),
  );

  const getCoordinate = ({ target, pageX, pageY }: MouseEvent) => {
    const img = target as HTMLImageElement;
    const { x, y } = img;
    const xPerCentage = ((pageX - x) / img.offsetWidth) * 100;
    const yPerCentage = ((pageY - y) / img.offsetHeight) * 100;
    setCoords({ x: xPerCentage, y: yPerCentage });
    newTranslationInput.focus();
  };

  const saveNewTranslation = () => {
    sdk.translations
      .create({
        key: newTranslationForm.key,
        view: +viewId,
        x: coords().x,
        y: coords().y,
        languages: newTranslationForm.languages,
      })
      .then(() => {
        setFeedback({ success: true, message: 'New translation added with success!' });
        setCoords(null);
        setNewTranslationForm({ key: '', languages: [] });
        loadData(sdk.views.getOne(+viewId));
      })
      .catch((e) => {
        setFeedback({ success: false, message: e.message });
      });
  };

  const setTranslationValue = (code: string, e: Event & { target: HTMLInputElement }) => {
    const value = e.target.value;
    const index = newTranslationForm.languages.findIndex((l) => l.language.connect.code === code);

    // TODO: Replace with `produce` when it comes out
    setNewTranslationForm('languages', (langs) => {
      if (index < 0) langs.push({ value, language: { connect: { code } } });
      else langs[index].value = value;
    });
  };

  const getTranslationValue = (code: string) => {
    const lang = newTranslationForm.languages.find((l) => l.language.connect.code === code);
    return !lang ? '' : lang.value;
  };

  const removeTranslation = (id: number) => {
    sdk.translations
      .remove(id)
      .then(() => {
        setFeedback({ success: true, message: 'Translation deleted with success!' });
        loadData(sdk.views.getOne(+viewId));
      })

      .catch((e) => {
        setFeedback({ success: false, message: e.message });
      });
  };

  return (
    <Page name={`Page ${data().view.name}`}>
      <Alert show={!!feedback.message} status={feedback.success ? 'success' : 'danger'} withIcon>
        {feedback.message}
      </Alert>

      <form
        onSubmit={prevent()}
        class="flex flex-col space-y-6"
        classList={{ 'mt-6': !!feedback.message }}
      >
        <div class="max-w-md mx-auto rounded-lg shadow-lg overflow-hidden relative">
          <img
            src={form.screenshot}
            class="block w-full h-auto cursor-pointer"
            onClick={getCoordinate}
          />
          <Show when={!!coords()}>
            <button
              class="h-4 w-4 rounded-full bg-gray-100 border border-gray-800 absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: coords().y + '%', left: coords().x + '%' }}
            >
              {data().view.translation.length + 1}
            </button>
          </Show>
          <For each={data().view.translation}>
            {(translation: any, i) => (
              <button
                class="h-4 w-4 rounded-full bg-gray-100 border border-gray-800 absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: translation.y + '%', left: translation.x + '%' }}
              >
                {i() + 1}
              </button>
            )}
          </For>
        </div>
        <Input
          label="Name of the page"
          name="name"
          value={form.name}
          onInput={(e) => setForm('name', e.target.value)}
          withValidation
          required
        />

        <table>
          <thead>
            <tr class="text-left">
              <td>#</td>
              <th>Key</th>
              <For each={data().languages}>{(lang) => <th>{lang.name}</th>}</For>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <For each={data().view.translation}>
              {(translation: any, i) => (
                <tr>
                  <td>{i() + 1}</td>
                  <td>{translation.key}</td>
                  <For each={data().languages}>
                    {(_, i) => (
                      <td>{translation.languages[i()] ? translation.languages[i()].value : ''}</td>
                    )}
                  </For>
                  <td>
                    <Button status="danger" onClick={() => removeTranslation(translation.id)}>
                      <Icon path={trash} class="h-5" />
                    </Button>
                  </td>
                </tr>
              )}
            </For>

            <Show when={!!coords()}>
              <tr>
                <td>{data().view.translation.length + 1}</td>
                <td>
                  <Input
                    ref={newTranslationInput}
                    value={newTranslationForm.key}
                    placeholder="Key of the translation"
                    onInput={(e) => setNewTranslationForm('key', e.target.value)}
                    name="key"
                  />
                </td>
                <For each={data().languages}>
                  {(lang) => (
                    <td>
                      <Input
                        placeholder={lang.name}
                        value={getTranslationValue(lang.code)}
                        onInput={(e) => setTranslationValue(lang.code, e)}
                      />
                    </td>
                  )}
                </For>
                <td>
                  <Button onClick={saveNewTranslation}>
                    <Icon path={upload} class="h-5" />
                  </Button>
                </td>
              </tr>
            </Show>
          </tbody>
        </table>

        <Button type="submit" class="ml-auto">
          Update now!
        </Button>
      </form>
    </Page>
  );
};

export default ViewDetails;
