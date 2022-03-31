import * as type from '../types/activity';
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.ACTIVITIES:
      return {
        ...state,
        listActivities: action.payload ?? {},
      };
    case type.SELECTED_ACTIVITIES:
      return {
        ...state,
        selectedActivities: action.payload ?? {},
      };
    case type.TEMP_ACTIVITIES:
      return {
        ...state,
        tempActivities: action.payload ?? {},
      };

    case type.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case type.ERROR:
      return {
        ...state,
        isError: action.payload,
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
