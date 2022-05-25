import iota from '../../config/api/route/iota';
import * as type from '../types/forget';
import Cookies from 'js-cookie';

export const setToken = (data) => ({
  type: type.TOKEN,
  payload: data,
});

export const setPhone = (data) => ({
  type: type.PHONE,
  payload: data,
});

export const setUserTemp = (data) => ({
  type: type.USER_TEMP,
  payload: data,
});

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const getOtp = (data) => async (dispatch) => {
  let threeMinute = new Date(new Date().getTime() + 3 * 60 * 1000);

  try {
    const result = await iota
      .getOtp({ phone: data })
      .then((response) => {
        Cookies.set('forgotUser', response.data.user.phone, {
          expires: threeMinute,
        });
        dispatch(setUserTemp(response.data.user));
        return {
          status: response.status,
          message: response?.data?.message ?? 'OTP Berhasil Terkirim',
          data: response.data,
        };
      })
      .catch((error) => {
        return {
          status: error?.response?.status ?? 500,
          message: error?.response?.data?.message ?? 'Something Happened',
          data: {},
        };
      });
    return result;
  } catch (error) {
    return {
      status: error.status,
      message: error?.response?.data?.message ?? 'Something Happened',
      data: {},
    };
  }
};

export const verifOtp = (data) => async (dispatch) => {
  try {
    const result = await iota
      .verifOtp({ phone: data.phone, token: data.token })
      .then((response) => {
        dispatch(setToken(data.token));
        return {
          status: response.status,
          message: response.data.data ?? 'OTP Berhasil Terverifikasi',
          data: {},
        };
      })
      .catch((error) => {
        return {
          status: error?.response?.status ?? 500,
          message: error?.response?.data?.message ?? 'Something Happened',
          data: {},
        };
      });
    return result;
  } catch (error) {
    return {
      status: error.status,
      message: error?.response?.data?.message ?? 'Something Happened',
      data: {},
    };
  }
};

export const setNewPassword = async (data) => {
  try {
    const result = await iota
      .changePassword(data)
      .then((response) => {
        return {
          status: response.status,
          message:
            response?.data?.message ?? 'Change password has been sucessfull',
          data: {},
        };
      })
      .catch((error) => {
        return {
          status: error?.response?.status ?? 500,
          message: error?.response?.data?.message ?? 'Something Happened!',
          data: {},
        };
      });
    return result;
  } catch (error) {
    return {
      status: error.status,
      message: error?.response?.data?.message ?? 'Something Happened!',
      data: {},
    };
  }
};
