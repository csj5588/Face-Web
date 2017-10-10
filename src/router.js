import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import IndexPage from './pages/IndexPage';
import Login from './pages/login/Login';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <IndexRedirect to="login" />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
