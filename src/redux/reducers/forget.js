import * as type from '../types/forget';

const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case type.TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case type.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case type.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case type.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
