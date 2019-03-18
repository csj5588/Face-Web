import React from 'react';

import styles from './index.less';

class Video extends React.Component {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      <div className={styles.container}>
        <video
          id="video"
          width="375"
          height="200"
          preload
          autoPlay
          loop
          muted
        />
        <canvas id="canvas" width="375" height="200" />
        <div style={{ display: 'none' }}>
          <canvas id="canvas2" width="375" height="200" />
        </div>
      </div>
    );
  }
}

export default Video;

