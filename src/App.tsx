import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login/index";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {

  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route path="/" component={Dashboard}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  )
}

export default App;
