import * as type from '../types/user';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.PROFILE:
      return {
        ...state,
        profile: action.payload ?? {},
      };

    case type.SESSION:
      return {
        ...state,
        session: action.payload ?? {},
      };

    default:
      return state;
  }
}
