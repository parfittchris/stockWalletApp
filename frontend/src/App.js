import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Test from './test.jsx';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/test" component={Test} />
        <div>Test Home Page</div>
      </Switch>
    </div>
  );
}

export default App;
