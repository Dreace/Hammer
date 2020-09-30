import { Effect, Reducer } from 'umi';
import { addInsider, fetchInsider, deleteInsider, editInsider } from '@/services/manager/insider';

export interface Insider {
  openId: string;
  key: string;
  expireAt: number;
  status: number;
}

export interface InsiderModelState {
  insiders?: Insider[];
  key?: string;
}

export interface InsiderModelType {
  namespace: 'insider';
  state: InsiderModelState;
  effects: {
    fetch: Effect;
    create: Effect;
    edit: Effect;
    delete: Effect;
  };
  reducers: {
    save: Reducer<InsiderModelState>;
    saveKey: Reducer<InsiderModelState>;
  };
}

const InsiderModel: InsiderModelType = {
  namespace: 'insider',
  state: {
    insiders: [],
    key: '',
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchInsider);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *create({ payload: values }, { call, put }) {
      const key = yield call(addInsider, values);
      if (key) {
        yield put({
          type: 'saveKey',
          payload: key,
        });
      }
      yield put({
        type: 'fetch',
      });
    },
    *delete({ payload: values }, { call, put }) {
      yield call(deleteInsider, values);
      yield put({
        type: 'fetch',
      });
    },
    *edit({ payload: { insiderId, values } }, { call, put }) {
      yield call(editInsider, insiderId, values);
      yield put({
        type: 'fetch',
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        insiders: action.payload || [],
      };
    },
    saveKey(state, action) {
      return {
        ...state,
        key: action.payload || '',
      };
    },
  },
};

export default InsiderModel;
