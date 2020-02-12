import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout';
import HotelCreation from './containers/HotelCreation/HotelCreation';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HotelCreation} />
        <Route path="/console" component={Layout} />
        <Route path="/" render={() => <h1>404. Not Found</h1>} />
      </Switch>
    </div>
  );
}

export default App;
