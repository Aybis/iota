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
  let data = [{ id: null, name: 'ALL TREG', alias: 'ALL TREG' }];
  return iota
    .regional()
    .then((res) => {
      res.data.map((item) => {
        data.push(item);
        return item;
      });
      dispatch(setDataRegional(data));
      return res;
    })
    .catch((err) => {
      return err.reseponse;
    });
};
