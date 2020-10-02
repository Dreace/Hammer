import { Effect, Reducer } from 'umi';
import { addSlide, fetchSlide, deleteSlide, editSlide } from '@/services/manager/slide';

export interface Slide {
  id: number;
  index: number;
  name: string;
  imageUrl: string;
  content: string;
}

export interface SlideModelState {
  slides?: Slide[];
}

export interface SlideModelType {
  namespace: 'slide';
  state: SlideModelState;
  effects: {
    fetch: Effect;
    create: Effect;
    edit: Effect;
    delete: Effect;
  };
  reducers: {
    save: Reducer<SlideModelState>;
  };
}

const SlideModel: SlideModelType = {
  namespace: 'slide',
  state: {
    slides: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchSlide);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *create({ payload: values }, { call, put }) {
      yield call(addSlide, values);
      yield put({
        type: 'fetch',
      });
    },
    *delete({ payload: values }, { call, put }) {
      yield call(deleteSlide, values);
      yield put({
        type: 'fetch',
      });
    },
    *edit({ payload: { slideId, values } }, { call, put }) {
      yield call(editSlide, slideId, values);
      yield put({
        type: 'fetch',
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        slides: action.payload || {},
      };
    },
  },
};

export default SlideModel;
