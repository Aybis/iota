import * as type from '../types/absen';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.CHECKIN:
      return {
        ...state,
        checkin: action.payload?.detail_absensi?.[0] ?? {},
        checkout: action.payload?.detail_absensi?.[1] ?? {},
        isCheckIn: action.payload?.detail_absensi?.[0] ? true : false,
        work: action.payload?.kehadiran ?? '',
      };

    case type.WORKING:
      return {
        ...state,
        work: action.payload ?? {},
      };

    case type.ABSEN:
      return {
        ...state,
        absen: action.payload ?? {},
      };

    case type.IS_TELAT:
      return {
        ...state,
        isTerlambat: action.payload ?? {},
      };

    case type.STATUS:
      return {
        ...state,
        status: action.payload ?? {},
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
