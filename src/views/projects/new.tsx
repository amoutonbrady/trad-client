import { Component, createState } from 'solid-js'
import { Alert, Button, Input, Page } from '../../components'
import { useSDK } from '../../services/sdk'
import { prevent } from '../../utils'

const LanguageNew: Component = () => {
  const sdk = useSDK()

  const [form, setForm] = createState({ name: '', code: '' })
  const [feedback, setFeedback] = createState({ success: false, message: '' })

  const createLanguage = () => {
    setFeedback({ success: false, message: '' })

    sdk.languages
      .create(form)
      .then(() => {
        setForm({ name: '', code: '' })
        setFeedback({
          success: true,
          message: 'Language created with success!',
        })
      })
      .catch(({ message }) => {
        setFeedback({ success: false, message })
      })
  }

  return (
    <Page name="Add a new language">
      <Alert
        show={!!feedback.message}
        status={feedback.success ? 'success' : 'danger'}
        withIcon
      >
        {feedback.message}
      </Alert>

      <form
        onSubmit={prevent(createLanguage)}
        class="flex flex-col space-y-6"
        classList={{ 'mt-6': !!feedback.message }}
      >
        <Input
          name="name"
          label="Name of the language"
          placeholder="French"
          value={form.name}
          onInput={(e) => setForm('name', e.target.value)}
          required
          withValidation
        />
        <Input
          name="code"
          label="Code of the language"
          hint="The format expected is 2-digit lowercase country code followed by and underscore followed by 2-digit uppercase region code"
          placeholder="fr_FR"
          minLength={5}
          maxLength={5}
          pattern="[a-z]{2}_[A-Z]{2}"
          value={form.code}
          onInput={(e) => setForm('code', e.target.value)}
          required
          withValidation
        />

        <Button type="submit" class="ml-auto">
          Create now!
        </Button>
      </form>
    </Page>
  )
}

export default LanguageNew
