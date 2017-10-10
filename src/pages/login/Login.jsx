import React from 'react';
import { connect } from 'dva';

/**
 * demo
 */
class Login extends React.Component {
  render() {
    return (
      <div>
        登录
      </div>
    );
  }
}

export default connect()(Login);
