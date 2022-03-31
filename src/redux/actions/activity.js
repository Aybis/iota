import * as type from '../types/activity';

export const setLoadingAct = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setMessageAct = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setErrorAct = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setDataAct = (data) => ({
  type: type.ACTIVITIES,
  payload: data,
});

export const setDataSelectedAct = (data) => ({
  type: type.SELECTED_ACTIVITIES,
  payload: data,
});

export const setTempAct = (data) => ({
  type: type.TEMP_ACTIVITIES,
  payload: data,
});
