import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Index from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {

  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route path="/" component={Index}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  )
}

export default App;
