import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import * as type from '../types/absen';

export const checkin = (data) => ({
  type: type.CHECKIN,
  payload: data,
});
export const absenToday = (data) => ({
  type: type.ABSEN,
  payload: data,
});

export const work = (data) => ({
  type: type.WORKING,
  payload: data,
});

export const terlambat = (data) => ({
  type: type.IS_TELAT,
  payload: data,
});

export const checkAbsensi = (data) => async (dispatch) => {
  setHeader();
  try {
    const result = await iota.fetchDailyPersonal(data);
    if (result.status === 200) {
      dispatch(absenToday(result.data));
      dispatch(checkin(result.data));
    }

    return {
      status: result.status,
      message: 'success',
      data: result.data,
    };
  } catch (error) {
    const messageError = error?.response.data.message ?? 'Something Happened!';
    return {
      status: error?.response.status ?? 500,
      message: messageError,
      data: null,
    };
  }
};

export const insertCheckin = (data) => async (dispatch) => {
  setHeader();
  try {
    const result = await iota.checkIn(data);
    const message = result?.data.message ?? 'Checkin berhasil!';

    return {
      status: result.status,
      message: message ?? 'Checkin berhasil!',
      data: result.data,
    };
  } catch (error) {
    const messageError = error?.response.data.message ?? 'Something Happened!';
    return {
      status: error?.response.status,
      message: messageError,
      data: null,
    };
  }
};

export const insertCheckout = (data, id) => async (dispatch) => {
  setHeader();

  try {
    const result = await iota.checkOut(data, id);
    return {
      status: result.status,
      message: result.data.message ?? 'Checkin berhasil!',
      data: result.data,
    };
  } catch (error) {
    const messageError = error?.response.data.message ?? 'Something Happened!';
    return {
      status: error?.response.status,
      message: messageError,
      data: null,
    };
  }
};
