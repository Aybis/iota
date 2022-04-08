import * as type from '../types/activity';
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.ACTIVITIES_BY_USER:
      return {
        ...state,
        activitiesByUser: action.payload ?? {},
      };

    case type.ACTIVITIES_BY_USER_PROGRESS:
      return {
        ...state,
        activitiesByUserProgress: action.payload ?? {},
      };

    case type.ACTIVITIES_BY_USER_DONE:
      return {
        ...state,
        activitiesByUserDone: action.payload ?? {},
      };

    case type.ACTIVITIES_BY_USER_PENDING:
      return {
        ...state,
        activitiesByUserPending: action.payload ?? {},
      };

    case type.HISTORY_ACTIVITIES:
      return {
        ...state,
        historyActivity: action.payload ?? {},
      };

    case type.DASHBOARD_ACTIVITIES_DONE:
      return {
        ...state,
        dashboardActDone: action.payload ?? {},
      };

    case type.DASHBOARD_ACTIVITIES_PENDING:
      return {
        ...state,
        dashboardActPending: action.payload ?? {},
      };

    case type.DASHBOARD_ACTIVITIES_PROGRESS:
      return {
        ...state,
        dashboardActProgress: action.payload ?? {},
      };

    case type.DASHBOARD_ACTIVITIES_EMPLOYEE:
      return {
        ...state,
        dashboardActEmployee: action.payload ?? {},
      };

    // ---------------------------------------------------
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

    case type.DASHBOARD_ACTIVITIES:
      return {
        ...state,
        dashboardActivities: action.payload ?? {},
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

    case type.MONTH:
      return {
        ...state,
        month: action.payload,
      };

    case type.YEAR:
      return {
        ...state,
        year: action.payload,
      };

    default:
      return state;
  }
}
