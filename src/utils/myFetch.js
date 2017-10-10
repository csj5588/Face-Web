// import fetch from 'isomorphic-fetch';
// import 'whatwg-fetch';
// import 'es6-promise';
// import 'fetch-detector';
// import 'fetch-ie8';
// import iconv from 'iconv-lite';
import Promise from 'promise';
// import 'promise-polyfill';
import util from './util';


export default {
  ajaxPost(url, data) {
    return new Promise((resolve, reject) => {
      // 获取浏览器类型
      const br = navigator.userAgent.toLowerCase(); // eslint-disable-line
      const browserVer = (br.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1]; // eslint-disable-line
      function handler() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          // resolve(this.response);
          /**
           * IE <=9
           **/
          if ((this.responseType || 'text') !== 'text' ||
            typeof this.responseText !== 'string') {
            // console.log('');
            // console.log('ie <= 9');
            // console.log(this.response);
            resolve(this.response);
          } else {
            // console.log('ie > 9');
            // console.log(this.responseText);
            resolve(this.responseText);
          }
        } else {
          reject(new Error(this.statusText), 'abc');
        }
      }
      const client = new XMLHttpRequest(); // eslint-disable-line
      client.open('POST', url);
      client.setRequestHeader('Accept', '*/*');
      client.setRequestHeader('If-Modified-Since', '0');
      client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      client.send(util.jsonToURLStr(data));
      // client.onreadystatechange = handler;
      // client.onload = handler;
      if (browserVer === '8.0') {
        client.onreadystatechange = handler;
      } else {
        client.onload = handler;
      }
    }).then(resData => util.toJSON(resData)).catch(err => console.log(err));
  },
  ajaxGet(url, reqData) {
    let localUrl = url;
    if (reqData) localUrl = util.trimGetURL(localUrl, reqData);
    return new Promise((resolve, reject) => {
      // 获取浏览器类型
      const br = navigator.userAgent.toLowerCase(); // eslint-disable-line
      const browserVer = (br.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1]; // eslint-disable-line
      function handler() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          /**
           * IE <=9
           **/
          if ((this.responseType || 'text') !== 'text' ||
            typeof this.responseText !== 'string') {
            // console.log('ie <= 9');
            // console.log(this.response);
            resolve(this.response);
          } else {
            // console.log('ie > 9');
            // console.log(this.responseText);
            resolve(this.responseText);
          }
        } else {
          reject(new Error(this.statusText));
        }
      }
      const client = new XMLHttpRequest(); // eslint-disable-line
      client.open('GET', localUrl);
      client.setRequestHeader('Accept', '*/*');
      client.setRequestHeader('If-Modified-Since', '0');
      client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      if (browserVer === '8.0') {
        client.onreadystatechange = handler;
      } else {
        client.onload = handler;
      }
      client.send();
    }).then(resData => util.toJSON(resData)).catch(err => console.log(err));
  },
  ajaxFile(url, data) {
    return new Promise((resolve, reject) => {
      // 获取浏览器类型
      const br = navigator.userAgent.toLowerCase(); // eslint-disable-line
      const browserVer = (br.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1]; // eslint-disable-line
      function handler() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          // resolve(this.response);
          /**
           * IE <=9
           **/
          if ((this.responseType || 'text') !== 'text' ||
            typeof this.responseText !== 'string') {
            // console.log('');
            resolve(this.response);
          } else {
            resolve(this.responseText);
          }
        } else {
          reject(new Error(this.statusText), 'abc');
        }
      }
      const client = new XMLHttpRequest(); // eslint-disable-line
      client.open('POST', url, true);
      client.send(data);
      // client.onreadystatechange = handler;
      // client.onload = handler;
      if (browserVer === '8.0') {
        client.onreadystatechange = handler;
      } else {
        client.onload = handler;
      }
    }).then(resData => util.toJSON(resData)).catch(err => console.log(err));
  },
  // fetchGet(url) {
  //   console.log(Pajax);
  //   console.log('new Pajax get', url);
  //   return Pajax.get(url)
  //     .then(response => {
  //       console.log('res');
  //       console.log(response);
  //       console.log(response.json());
  //       return response;
  //     });
  // },
  // fetchGet(url) {
  //   console.log(fetch);
  //   console.log('new fetch get', url);
  //   return fetch(url)
  //     .then(response => response.arrayBuffer())
  //     .then(arrayBuffer => {
  //       const buffer = new Buffer(arrayBuffer, 'binary');
  //       // console.log(buffer.toString('UTF-8'));
  //       // console.log(iconv.decode(buffer, 'gbk'));
  //       // console.log(iconv.decode(blob, 'GBK'));
  //       // const reader = new FileReader();
  //       // reader.onload = (e) => {
  //       //   const newText = reader.result;
  //       //   // return newText;
  //       //   console.log(newText);
  //       // };
  //       // reader.readAsText(blob, 'GBK');
  //       // console.log('***');
  //       // console.log(reader);
  //       // console.log(reader.readAsText(blob, 'GBK'));
  //
  //       // return '';
  //     });
  // },
  // fetchGet(url) {
  //   return fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //     },
  //   })
  //     .then(response => {
  //       console.log(response);
  //       // console.log(response.text());
  //       return response.arrayBuffer();
  //     })
  //     .then(buffer => {
  //       console.log(buffer);
  //       console.log(iconv.decode(buffer, 'gbk'));
  //       return buffer;
  //     });
  // },
  //
  // fetchPost(url, data) {
  //   return fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //     },
  //     responseType: 'application/json',
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => response.json())
  //     .catch(err => {
  //       console.log('error 这里需要一个错误处理', err);
  //     });
  // },
};
