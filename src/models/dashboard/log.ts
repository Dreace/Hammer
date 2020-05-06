import { Effect, Reducer } from 'umi';

import { getLog } from '@/services/dashboard/log';

export enum LogLevelType {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
  FATAL,
}

export interface LogLine {
  time: number;
  level: LogLevelType;
  message: string;
}


export interface LogLineModelType {
  namespace: 'log';
  state: LogLine[];
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<LogLine[]>;
  };
}

const LogModel: LogLineModelType = {
  namespace: 'log',
  state: [],
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(getLog);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return action.payload;
    },
  },
};

export default LogModel;
