import { routerRedux } from 'dva/router';
import * as api from './publicApi';

export default {
  namespace: 'solomn',
  state: {
    showLoading: false,
    showTips: {
      show: false,
      text: '',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *fetchLogout({ payload }, { put }) {
      yield put({ type: 'logout' });
      yield put(routerRedux.push('/login'));
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    'change/showLoading': (state, { payload }) => ({ ...state, showLoading: payload }),
    'change/showTips': (state, { payload }) => ({ ...state, showTips: payload }),
  },
};
