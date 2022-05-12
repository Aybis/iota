import * as type from '../types/libur';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.LIST_DATA_HOLIDAY:
      return {
        ...state,
        listData: action.payload,
      };

    case type.TABLE_HEADER:
      return {
        ...state,
        tableHeader: action.payload,
      };

    case type.PAGINATION_HOLIDAY:
      return {
        ...state,
        pagination: action.payload,
      };

    case type.HOLIDAY_SELECTED:
      return {
        ...state,
        holidaySelected: action.payload,
      };

    case type.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case type.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case type.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
