import * as type from '../types/witel';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.ALL_WITEL:
      return {
        ...state,
        allWitel: action.payload,
      };

    case type.TEMP_WITEL:
      return {
        ...state,
        tempWitel: action.payload,
      };

    case type.LOADING:
      return {
        ...state,
        loadingWitel: action.payload,
      };

    case type.MESSAGE:
      return {
        ...state,
        messageWitel: action.payload,
      };

    default:
      return state;
  }
}
