import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Main from '../pages/Main';
import Login from '../pages/Login';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Main} isPrivate />
    <Route path="/login" exact component={Login} />
  </Switch>
);

export default Routes;
