import { Component } from 'solid-js'
import { Page } from '../components'
import { Upload } from '../components/form/upload'

const Home: Component = () => (
  <Page name="Dashboard">
    <Upload value="http://localhost:5123/GbJrp.jpg" />
  </Page>
)

export default Home
