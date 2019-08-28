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

  componentDidMount() {
    this.initFace();
  }

  initFace = () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');       
    const canvas2 = document.getElementById('canvas2');
    const context = canvas.getContext('2d');
    const context2 = canvas2.getContext('2d');

    const tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(1);
    tracker.setEdgesDensity(0.1);

    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', (event) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      event.data.forEach((rect) => {
        context.strokeStyle = '#10ff87';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText("x:" + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });

      context2.drawImage(video, 0, 0, 200, 150);
      const snapData = canvas2.toDataURL('image/png');
      const imgSrc = "data:image/png;" + snapData;
      this.setState({ currentBase64: imgSrc });
    });
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

        <VideoBox />

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
