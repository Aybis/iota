import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import * as type from '../types/regional';

export const setMessageReg = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setLoadingReg = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setDataRegional = (data) => ({
  type: type.REGIONAL,
  payload: data,
});

export const setSelectedRegional = (data) => ({
  type: type.REGIONAL_SELECTED,
  payload: data,
});

export const fetchAllRegional = () => async (dispatch) => {
  setHeader();

  return iota
    .regional()
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.reseponse;
    });
};
