import fetch from 'dva/fetch';
import { stringify } from 'qs';
import myFetch from './myFetch';
import util from './util';

function parseJSON(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // eslint-disable-line
    reader.onload = () => {
      try {
        // console.log('parseJSON success');
        resolve(JSON.parse(reader.result || {}));
      } catch (err) {
        console.log(err);
        reject({ type: 'error', code: 'toJSON', msg: 'string to json is ERROR' });
      }
    };
    reader.readAsText(blob, 'GBK');
  });
}

function checkSuccess(resData) {
  return new Promise((resolve, reject) => {
    // console.log('checkSuccess');
    if (util.isSuccess(resData)) {
      // console.log('checkSuccess', 'success');
      resolve(resData);
    } else {
      // console.log('checkSuccess', 'error');
      reject({
        type: 'warning',
        code: resData && resData.GWA && resData.GWA.MSG_CD,
        msg: (resData && resData.GWA && resData.GWA.MSG_DAT) || '交易失败',
      });
    }
  });
}

function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      resolve(response);
    } else {
      reject({ type: 'error', code: response.status, msg: response.statusText });
    }
  });

  // console.log('error');
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}
/**
 * 添加公共数据
 */
function merge(data) {
  const publicData = {
    // APP_ID: 'APP201609020045445434',
  };
  return Object.assign({ ...data, ...publicData });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const newOptions = {
    credentials: 'include',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };
  if (options && options.method === 'post') {
    newOptions.method = 'POST';
    newOptions.body = stringify(options && options.data);
  } else {
    newOptions.method = 'GET';
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(res => res.blob())
    .then(parseJSON)
    .then(checkSuccess)
    .then(data => ({ data }))
    .catch((err) => {
      if (err.type === 'error' || err.type === 'warning') {
        throw err;
      } else {
        return { err };
      }
    });
}


/**
 * 文件上传
 */
export const file = (url, fileData, reqData) => {
  // console.log('request', 'file');
  let newUrl = url;
  if (reqData) newUrl = util.trimGetURL(url, reqData);
  // return fetch(url, {
  //   credentials: 'include',
  //   headers: {
  //     Accept: '*/*',
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //   },
  //   method: 'POST',
  //   body: fileData,
  // })
  // .then(checkStatus)
  // .then(res => res.blob())
  // .then(parseJSON)
  // .then(checkSuccess)
  // .then(data => ({ data }))
  // .catch((err) => {
  //   if (err.type === 'error' || err.type === 'warning') {
  //     throw err;
  //   } else {
  //     return { err };
  //   }
  // });
  return myFetch.ajaxFile(newUrl, fileData);
};

export const get = (url, data) => request(`${url}${url.indexOf('?') > 0 ? '&' : '?'}${stringify(merge(data))}`);
export const post = (url, data) => request(url, { method: 'post', data: merge(data) });

// export const get = (url, data) => fetch.ajaxGet(url, merge(data))
//   .then(resData => ({ data: resData }));
// export const post = (url, data) => fetch.ajaxPost(url, merge(data))
//   .then(resData => ({ data: resData }));
