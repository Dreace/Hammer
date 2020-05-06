import { stringify } from 'querystring';
import { history, Effect } from 'umi';

import { Login } from '@/services/login';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  token: string;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    token: '',
  },

  effects: {
    * login({ payload }, { call }) {
      const response = yield call(Login, payload);
      if (response) {
        sessionStorage.setItem('access_token', response.access_token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      sessionStorage.clear();
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
};

export default Model;
