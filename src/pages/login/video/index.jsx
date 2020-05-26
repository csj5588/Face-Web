/**
 * author cuishijie
 * 
 * face-web component
 * apis props
 * @onChange (function) output base64 real time
 * @debounceTime (String)
 * @className (String) for cover container style
 */

import React from 'react';
import _debounce from 'lodash/debounce';

let canvas, canvas2, context, context2, video;
let timer = true;

class FaceWeb extends React.Component {
  componentDidMount() {
    this.initFace()
  }

  initFace() {
    const { debounceTime = 0 } = this.props;

    video = document.getElementById('_videoFace');
    canvas = document.getElementById('_canvasFace');       
    canvas2 = document.getElementById('_canvas2Face');
    context = canvas.getContext('2d');
    context2 = canvas2.getContext('2d');

    const tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(1);
    tracker.setEdgesDensity(0.1);

    tracking.track('#_videoFace', tracker, { camera: true });

    tracker.on('track', (event) => {
      // no-face
      if (event.data.length === 0) return;
      // debounce
      if (timer) {
        this.draw(event)
        timer = false;
        setTimeout(() => {
          timer = true;
        }, debounceTime)
      }
    });
  }

  draw(event) {
    const { onChange } = this.props;

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
    // sync
    onChange(imgSrc);
  }

  render() {
    const { className = '' } = this.props;
    return (
      <div className={className}>
        <video
          id="_videoFace"
          width="375"
          height="200"
          preload
          autoPlay
          loop
          muted
        />
        <canvas id="_canvasFace" width="375" height="200" />
        <div style={{ display: 'none' }}>
          <canvas id="_canvas2Face" width="375" height="200" />
        </div>
      </div>
    );
  }
}

export default FaceWeb;

