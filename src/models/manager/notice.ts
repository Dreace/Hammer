import { Effect, Reducer } from 'umi';
import { addNotice, fetchNotice, deleteNotice, editNotice } from '@/services/manager/notice';

export interface Notice {
  id: number;
  title: string;
  content: string;
  time: string;
  isStick: boolean;
  isImportant: boolean;
  announcer: string;
}

export interface NoticeModelState {
  notices?: Notice[];
}

export interface NoticeModelType {
  namespace: 'notice';
  state: NoticeModelState;
  effects: {
    fetch: Effect;
    create: Effect;
    edit: Effect;
    delete: Effect;
  };
  reducers: {
    save: Reducer<NoticeModelState>;
  };
}

const NoticeModel: NoticeModelType = {
  namespace: 'notice',
  state: {
    notices: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchNotice);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *create({ payload: values }, { call, put }) {
      yield call(addNotice, values);
      yield put({
        type: 'fetch',
      });
    },
    *delete({ payload: values }, { call, put }) {
      yield call(deleteNotice, values);
      yield put({
        type: 'fetch',
      });
    },
    *edit({ payload: { noticeId, values } }, { call, put }) {
      yield call(editNotice, noticeId, values);
      yield put({
        type: 'fetch',
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        notices: action.payload || {},
      };
    },
  },
};

export default NoticeModel;
