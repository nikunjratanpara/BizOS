import './App.scss';
import './assets/bootstrap/scss/bootstrap.scss';

import * as React from 'react';
import { Provider } from 'react-redux';

import { Layout } from './components/layout/layout.component';
import createStore from './store/configuration';

class App extends React.Component {
  public formName: string;
  public render() {
    return (
      <Provider store={createStore()} >
        <Layout />
      </Provider>
    );
  }
}

export default App;
