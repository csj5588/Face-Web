import React from 'react';
import {
  TITLE,
  REAL_TIME_SCREENSHOTS,
  REAL_TIME_BASE64,
} from './contants';
import VideoBox from './video';

import styles from './Login.less';

/**
 * container
 */
class Login extends React.Component {
  state = {
    currentBase64: '',
	};

	handleSrc = (base64) => {
		this.setState({ currentBase64: base64 });
	}

  render() {
    const { currentBase64 } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <p>
            {TITLE}
          </p>
        </div>

				<VideoBox
					onChange={this.handleSrc}
				/>

        <div className={styles.picture}>
          <div className={styles.title}>
            {REAL_TIME_SCREENSHOTS}
          </div>
          <div className={styles.imgBox}>
            <img src={currentBase64} alt="" />
          </div>
          <div className={styles.title}>
            {REAL_TIME_BASE64}
          </div>
          <p>{currentBase64}</p>
        </div>
      </div>
    );
  }
}

export default Login;
