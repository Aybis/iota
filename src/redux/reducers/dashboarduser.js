import * as type from '../types/dashboarduser';

const initialState = {
  // kehadiran: 0,
  // keterangan: 0,
  // summary: {},
  // terlambat: 0,
  // absent: 0,
  // work: {},
  // status: {},
  // isLoading: false,
  // isError: false,
  // message: '',
  // progress: 'idle',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.SUMMARY:
      return {
        ...state,
        summary: action.payload ?? {},
      };
    case type.KEHADIRAN:
      return {
        ...state,
        kehadiran: action.payload ?? 0,
      };
    case type.KETERANGAN:
      return {
        ...state,
        keterangan: action.payload ?? 0,
      };
    case type.TERLAMBAT:
      return {
        ...state,
        terlambat: action.payload ?? 0,
      };
    case type.ABSENT:
      return {
        ...state,
        absent: action.payload ?? 0,
      };
    case type.WORK:
      return {
        ...state,
        work: action.payload ?? {},
      };
    case type.STATUS:
      return {
        ...state,
        status: action.payload ?? {},
      };
    case type.LOADING:
      return {
        ...state,
        isLoading: action.payload ?? false,
      };
    case type.ERROR:
      return {
        ...state,
        isError: action.payload ?? false,
      };
    case type.MESSAGE:
      return {
        ...state,
        message: action.payload ?? '',
      };
    case type.PROGRESS:
      return {
        ...state,
        progress: action.payload ?? 'idle',
      };

    default:
      return state;
  }
}
