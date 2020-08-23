import { Component } from 'solid-js';
import { Page } from '../components';
import { Upload } from '../components/form/upload';

const Home: Component = () => (
  <Page name="Dashboard">
    <Upload />
  </Page>
);

export default Home;
