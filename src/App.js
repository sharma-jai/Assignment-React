import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import store from './Redux/store'
import { Provider } from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
