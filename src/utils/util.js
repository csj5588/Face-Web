

export default {
  trimGetURL(url, data) {
    let result = '';
    if (url && data) {
      const lastCode = url.substr(url.length - 1);
      result = `${url}${lastCode === '?' ? '&' : '?'}`;
      const keys = Object.keys(data);
      if (keys.length > 0) {
        for (const key of keys) {
          const value = (data[key] && encodeURIComponent(data[key])) || '';
          result = `${result}${key}=${value}&`;
        }
      }
      result = result.substr(0, result.length - 1);
    }
    return result;
  },
  jsonToURLStr(data) {
    let result = '';
    const keys = Object.keys(data);
    if (keys.length > 0) {
      for (const key of keys) {
        const value = (data[key] && encodeURIComponent(data[key])) || '';
        result = `${result}${key}=${value}&`;
      }
      result = result.substr(0, result.length - 1);
    }
    return result;
  },
  isSuccess(obj) {
    let result = false;
    const str = typeof obj === 'object' && obj.GWA && obj.GWA.MSG_CD ? obj.GWA.MSG_CD : obj || '';
    if (str && typeof (str) === 'string' && str.length > 0) {
      try {
        const mark = str.substr(str.length - 5);
        if (mark === '00000') result = true;
      } catch (err) {
        result = false;
      }
    }
    return result;
  },
  toJSON(str) {
    let resJSON;
    try {
      resJSON = JSON.parse(str);
    } catch (e) {
      resJSON = {};
    }
    return resJSON;
  },
  validate(key, state, keyValue) {
    let b = true;
    const value = keyValue !== undefined ? keyValue : state[key];
    const regs = state[`${key}Validation`];
    if (Array.isArray(regs) && regs.length > 0) {
      regs.forEach((item) => {
        // 默认object类型为正则格式
        if (typeof item === 'object') {
          if (!item.test(value)) {
            b = false;
          }
        } else if (typeof item === 'string') {
          if (item.substr(0, 3) === '===') {
            const compareKey = item.substr(3);
            if (!state[compareKey] || !state[key] || state[compareKey] !== state[key]) {
              b = false;
            }
          }
        }
      });
    }
    return b;
  },
  getCurDate(y = 0, m = 0, d = 0) {
    const curDate = new Date();
    const returnDate = new Date();
    returnDate.setYear(curDate.getFullYear() + y);
    returnDate.setMonth(curDate.getMonth() + m);
    returnDate.setDate(curDate.getDate() + d);
    return returnDate;
  },
  addEvent(el, e, callback, capture) {
    const hasEventListeners = !!window.addEventListener;
    if (hasEventListeners) {
      el.addEventListener(e, callback, !!capture);
    } else {
      el.attachEvent(`on${e}`, callback);
    }
  },
  removeEvent(el, e, callback, capture) {
    const hasEventListeners = !!window.addEventListener;
    if (hasEventListeners) {
      el.removeEventListener(e, callback, !!capture);
    } else {
      el.detachEvent(`on${e}`, callback);
    }
  },
  log(str) {
    if (window.HifondApi) {
      window.HifondApi.showToast(str);
    } else {
      console.log(str);
    }
  },
  getVersion() {
    if (window.HifondApi) {
      return window.HifondApi.getVersion();
    }
    return '';
  },
  getDeviceId() {
    if (window.HifondApi) {
      return window.HifondApi.getDeviceId();
    }
    return '';
  },
  errorAction() {
    this.log('请按屏幕提示有序的进行操作');
  },
  isDev() {
    return !!window.HifondApi;
  },
  playMusic(str) {
    if (window.HifondApi) {
      window.HifondApi.playMusic(str);
    }
  },
  stopMusic() {
    if (window.HifondApi) {
      window.HifondApi.stopMusic();
    }
  },
  trimLongStr(str, length) {
    if (str && length && str.length >= length) {
      const l = str.length;
      return `${str.substr(0, 4)}******${str.substr(l - 4, l)}`;
    }
    return str || '';
  },
  getConfig(key) {
    const config = window.HifondConfig;
    let value;
    if (config) {
      if (typeof key === 'string') {
        value = config[key];
      }
      if (Array.isArray(key)) {
        // console.log('getConfig', key.reduce((obj, k) => (obj ? obj[k] : obj), config));
        value = key.reduce((obj, k) => (obj ? obj[k] : obj), config);
      }
      if (!value) console.error('window.HifondConfig', key, value);
      return value;
    }
    return undefined;
  },
  getConfigJSON(keys, value) {
    const newJSON = {};
    if (typeof keys === 'object') {
      const objKeys = Object.keys(keys);
      objKeys.forEach((item) => {
        const key = keys[item];
        if (typeof key === 'string') {
          if (typeof value[key] !== 'undefined') {
            newJSON[key] = value[key];
          }
        } else if (typeof key === 'object') {
          if (typeof value[key.value] !== 'undefined') {
            if (key.type === 'money') {
              newJSON[key.value] = (value[key.value] || 0) / (item.unit || 1);
            } else if (key.type === 'url') {
              newJSON[key.value] = decodeURIComponent(value[key.value] || '');
            }
          }
        }
      });
    }
    return newJSON;
  },
  checkOrderState(state) {
    switch (state) {
      case 'T': return '待付款';
      case 'H': return '待发货';
      case 'P': return '待确认';
      case 'W': return '待收货';
      case 'S': return '收到货物';
      case 'C': return '订单已取消';
      default: return '订单状态异常';
    }
  },
  filterProType(type) {
    switch (type) {
      case '000001': return 'hifond标准型号';
      case '000002': return 'Hifond身份证型号';
      case '000003': return 'Hifond一维码';
      case '000004': return 'Hifond全能型号';
      case '000005': return '标准配件';
      case '000006': return '台式配件';
      case '000007': return '立式配件';
      case '000008': return '壁挂式配件';
      case 'logo': return '标志类型';
      default: return '设备类型异常';
    }
  },
  filterLogoType(type) {
    switch (type) {
      case 'HIFOND': return 'Hifond标志';
      case 'WX': return '微信标志';
      case 'ZFB': return '支付宝标志';
      case 'GYQ': return '感应区标志';
      default: return '标志类型异常';
    }
  },
  getDateStr(date) {
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const time = `${date.getFullYear()}${month}${day}`;
    return time;
  },
  getDate(aa, begin) {  // 获取指定时间  传入int类型 与当前时间之间的差值
    const date1 = new Date();
    const time1 = this.getDateStr(date1);
    if (begin !== undefined) {
      const beginStr = new Date(begin);
      const timer4 = this.getDateStr(beginStr);
      if (parseInt(timer4, 10) >= parseInt(time1, 10)) {
        return {
          tDay: [],
          yDay: [],
          rDay: [],
        };
      }
    }
    const date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
    const time2 = this.getDateStr(date2);
    let time3 = []; // 获取每一天的日期数组
    const date4 = new Date(date1); // 不获取当天
    date4.setDate(date1.getDate() - 1);
    const time4 = this.getDateStr(date4);
    if (aa === -1) {
      time3 = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    } else if (aa < -1 && aa > -31) {
      for (let i = (-1 - aa); i >= 0; i -= 1) {
        const date3 = new Date(begin || date4);
        date3.setTime(date3.getTime() - (i * 24 * 60 * 60 * 1000));
        const timer = this.getDateStr(date3);
        time3.push(timer);
      }
    } else if (aa <= -31 && aa > -61) { // 如果时间大于30天按5天为一个节点
      for (let i = (-1 - aa); i >= 0; i -= 1) {
        if (i % 5 === 0) {
          const date3 = new Date(begin || date4);
          date3.setTime(date3.getTime() - (i * 24 * 60 * 60 * 1000));
          const timer = this.getDateStr(date3);
          time3.push(timer);
        }
      }
    }
    const resData = {
      tDay: time1,
      yDay: time2,
      rDay: time3,
      lDay: time4,
    };
    return resData;
  },
  getDateDiff(startDate, endDate) {  // 获取日期事件差几天
    const startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime();
    const endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime();
    const dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    return dates + 1;
  },
  showMessage(text) {
  },
  getThreeMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? (`0${date.getMonth() + 1}`) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? (`0${date.getDate()}`) : date.getDate();
    const today = `${year}${month}${day}`;
    let month2 = '';
    let year2 = '';
    if ((date.getMonth() - 2) < 1) {
      month2 = (date.getMonth() + 10);
      year2 = date.getFullYear() - 1;
    } else {
      month2 = (date.getMonth() - 2);
    }
    const day3 = `${year2}${month2}${day}`;
    const resData = {
      Today: today,
      Day3: day3,
    };
    return resData;
  },
  filterDevType(type) {
    switch (type) {
      case '1': return '未绑定';
      case '2': return '已绑定,未上架';
      case '3': return '已绑定,已上架';
      case '4': return '暂停使用';
      case '5': return '已绑定用户,未绑定应用';
      default: return '设备类型异常';
    }
  },
};
