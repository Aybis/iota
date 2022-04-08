import * as type from '../types/regional';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.REGIONAL:
      return {
        ...state,
        listRegional: action.payload ?? {},
      };

    case type.REGIONAL_SELECTED:
      return {
        ...state,
        selectRegional: action.payload ?? {},
      };

    case type.LOADING:
      return {
        ...state,
        loadingReg: action.payload ?? {},
      };

    case type.MESSAGE:
      return {
        ...state,
        messageReg: action.payload ?? {},
      };

    default:
      return state;
  }
}
