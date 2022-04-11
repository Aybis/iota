import * as type from '../types/reportuser';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.MINGGUAN:
      return {
        ...state,
        mingguan: action.payload ?? {},
      };

    case type.BULANAN:
      return {
        ...state,
        bulanan: action.payload ?? {},
      };

    case type.DOWNLOAD:
      return {
        ...state,
        linkDownload: action.payload ?? {},
      };

    case type.LOADING:
      return {
        ...state,
        isLoading: action.payload ?? {},
      };

    case type.ERROR:
      return {
        ...state,
        isError: action.payload ?? {},
      };
    case type.MESSAGE:
      return {
        ...state,
        message: action.payload ?? {},
      };

    default:
      return state;
  }
}
