import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import * as type from '../types/witel';

export const setAllWitel = (data) => ({
  type: type.ALL_WITEL,
  payload: data,
});

export const setTempWitel = (data) => ({
  type: type.TEMP_WITEL,
  payload: data,
});

export const setLoadingWitel = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setMessageWitel = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const fetchDataWitel = (params) => async (dispatch) => {
  setHeader();

  return await iota
    .witel()
    .then((res) => {
      dispatch(setAllWitel(res.data));
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
