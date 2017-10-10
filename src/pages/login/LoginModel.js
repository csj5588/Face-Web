import * as api from './LoginApi';

export default {

  namespace: 'login',
  state: {
    name: 'login',
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return true;
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    'change/menu': (state, { payload }) => ({ ...state, payload }),
  },
};
