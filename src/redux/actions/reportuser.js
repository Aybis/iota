import axios from 'axios';
import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import { convertDate } from '../../helpers/convertDate';
import * as type from '../types/reportuser';
import Cookies from 'js-cookie';

export const setDataMingguan = (data) => ({
  type: type.MINGGUAN,
  payload: data,
});

export const setDataBulanan = (data) => ({
  type: type.BULANAN,
  payload: data,
});

export const setLinkDownload = (data) => ({
  type: type.DOWNLOAD,
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

export const fetchAbsensiMingguan = (data) => async (dispatch) => {
  setHeader();
  dispatch(setLoading(true));
  try {
    const result = await iota.fetchWeeklyPersonal({
      params: {
        user_id: data,
      },
    });

    dispatch(setLoading(false));
    dispatch(setDataMingguan(result.data));

    return {
      status: result.status,
      message: 'Success',
      data: result.data.data,
    };
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(true));

    const messageError = error?.response.data.message ?? 'Something Happened!';

    return {
      status: error?.response.status,
      message: messageError,
      data: null,
    };
  }
};

export const fetchAbsensiBulanan = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  setHeader();
  try {
    const result = await iota.fetchReportPersonal({
      params: {
        user_id: data.id,
        month: data.month ?? convertDate('bulan'),
        year: data.year ?? convertDate('tahun'),
        size: 100,
      },
    });

    dispatch(setLoading(false));
    dispatch(setDataBulanan(result.data.data));

    return {
      status: result.status,
      message: 'Success',
      data: result.data.data,
    };
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(true));

    const messageError = error?.response.data.message ?? 'Something Happened!';

    return {
      status: error?.response.status,
      message: messageError,
      data: null,
    };
  }
};

export const downloadReportPersonal = async (data) => {
  const token = Cookies.get('session');

  var config = {
    method: 'get',
    url: `https://squadiota-apistaging.pins.co.id/api/absensi/export-personal?month=${data.month}&year=${data.year}&user_id=${data.id}&name=${data.name}`,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  };

  return await axios(config)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${data.name}.xlsx`);
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => console.log(error.response));
};

export const setDownloadParam = (data) => (dispatch) => {
  setHeader();

  const url = `${process.env.REACT_APP_API_HOST}absensi/export-personal?month=${data.month}&year=${data.year}&user_id=${data.id}&name=${data.name}`;
  dispatch(setLinkDownload(url));
};

export const downloadAbsen = (data) => async (dispatch) => {};
