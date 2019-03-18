import React from 'react';
import { connect } from 'dva';

import VideoBox from './video';

import styles from './Login.less';

/**
 * demo
 */
class Login extends React.Component {
  state = {
    currentBase64: '',
  };

  componentDidMount() {
    this.initFace();
  }

  initFace = () => {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var canvas2 = document.getElementById('canvas2');
    var context = canvas.getContext('2d');
    var context2 = canvas2.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
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
      var snapData = canvas2.toDataURL('image/png');
      var imgSrc = "data:image/png;" + snapData;
      this.setState({ currentBase64: imgSrc });
    });
  }

  render() {
    const { currentBase64 } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <p>人脸登录</p>
        </div>

        <VideoBox />

        <div className={styles.picture}>
          <div className={styles.title}>实时截图</div>
          <div className={styles.imgBox}>
            <img src={currentBase64} alt="" />
          </div>
          <div className={styles.title}>实时base64</div>
          <p>{currentBase64}</p> 
        </div>
      </div>
    );
  }
}

export default connect()(Login);
