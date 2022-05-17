import * as type from '../types/employee';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.ALL_EMPLOYEE:
      return {
        ...state,
        allEmployee: action.payload ?? {},
      };

    case type.SELECT_EMPLOYEE:
      return {
        ...state,
        selectEmployee: action.payload ?? {},
      };

    case type.LOADING:
      return {
        ...state,
        isLoading: action.payload ?? {},
      };

    case type.MESSAGE:
      return {
        ...state,
        message: action.payload ?? {},
      };

    case type.ERROR:
      return {
        ...state,
        isError: action.payload ?? {},
      };

    default:
      return state;
  }
}
