import { Effect, Reducer } from 'umi';
import { addRole, fetchRole, deleteRole, editRole } from '@/services/systemMange/role/role';

export interface Role {
  id: number;
  name: string;
  chineseName: string;
  description: string;
  time: string;
}

export interface RoleModelState {
  roles?: Role[];
}

export interface RoleModelType {
  namespace: 'role';
  state: RoleModelState;
  effects: {
    fetch: Effect;
    create: Effect;
    edit: Effect;
    delete: Effect;
  };
  reducers: {
    save: Reducer<RoleModelState>;
  };
}

const RoleModel: RoleModelType = {
  namespace: 'role',
  state: {
    roles: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchRole);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *create({ payload: values }, { call, put }) {
      yield call(addRole, values);
      yield put({
        type: 'fetch',
      });
    },
    *delete({ payload: values }, { call, put }) {
      yield call(deleteRole, values);
      yield put({
        type: 'fetch',
      });
    },
    *edit({ payload: { id, values } }, { call, put }) {
      yield call(editRole, id, values);
      yield put({
        type: 'fetch',
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        roles: action.payload || {},
      };
    },
  },
};

export default RoleModel;
