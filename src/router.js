import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './pages/IndexPage';
import Login from './pages/login/Login';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/#/" component={IndexPage}>
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
