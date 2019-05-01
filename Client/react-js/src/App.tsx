import './App.css';

import * as React from 'react';

import { FormComponent } from './controls/components/form.component';
import { SearchBox } from './controls/components/typeahead/searchbox.component';
import logo from './logo.svg';

interface IState {
  city:any
}
class App extends React.Component<any, IState> {
  constructor(props:any) {
    super(props);
    this.state = {city:{}};
    this.onSelect = this.onSelect.bind(this);
  }
  public onSelect(model:any) {
    this.setState({city:model}) ;
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <FormComponent />
        <SearchBox type="text" name="city" codeCol="cc" discriptionCol="name" catalogName="city" onSelect={this.onSelect}  />
      </div>
    );
  }
}

export default App;
