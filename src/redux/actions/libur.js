import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import * as type from '../types/libur';

export const getDataHoliday = (data) => ({
  type: type.LIST_DATA_HOLIDAY,
  payload: data,
});

export const setDataHoliday = (data) => ({
  type: type.HOLIDAY_SELECTED,
  payload: data,
});

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setHeaderHoliday = (data) => ({
  type: type.TABLE_HEADER,
  payload: data,
});

export const setPaginationHoliday = (data) => ({
  type: type.PAGINATION_HOLIDAY,
  payload: data,
});

export const fetchDataHoliday = (page, date, total) => async (dispatch) => {
  dispatch(setLoading(true));
  setHeader();
  try {
    return await iota
      .getHoliday({
        params: {
          page: page ?? 1,
          date: date,
          size: total ?? 100,
        },
      })
      .then((res) => {
        dispatch(getDataHoliday(res.data.data));
        dispatch(setPaginationHoliday(res.data));
        let dataHeader = Object.keys(res?.data?.data[0]).filter(
          (item) => item !== 'id',
        );
        dispatch(setHeaderHoliday(dataHeader));
        dispatch(setLoading(false));

        return res.data.data;
      });
  } catch (error) {
    const messageError =
      error?.response?.data?.message ?? 'Something Happened!';
    dispatch(setLoading(false));

    return {
      status: error?.response?.status ?? 500,
      message: messageError,
      data: null,
    };
  }
};

export const insertDataHoliday = (data) => async (dispatch) => {
  setHeader();

  return await iota
    .insertHoliday(data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      const messageError =
        error?.response.data.message ?? 'Something Happened!';
      return {
        status: error?.response.status ?? 500,
        message: messageError,
        data: null,
      };
    });
};

export const updateDataHoliday = (data, id) => async (dispatch) => {
  setHeader();

  return await iota
    .updateHoliday(id, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      const messageError =
        error?.response.data.message ?? 'Something Happened!';
      return {
        status: error?.response.status ?? 500,
        message: messageError,
        data: null,
      };
    });
};

export const deleteDataHoliday = (id) => async (dispatch) => {
  setHeader();

  return await iota
    .updateHoliday(id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
