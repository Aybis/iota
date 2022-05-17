import swal from 'sweetalert';
import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import * as type from '../types/employee';

export const setAllEmployee = (data) => ({
  type: type.ALL_EMPLOYEE,
  payload: data,
});

export const setSelectEmployee = (data) => ({
  type: type.SELECT_EMPLOYEE,
  payload: data,
});

export const setEmpLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setEmpMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});
export const setEmpError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const fetchAllEmployee = () => async (dispatch) => {
  setHeader();
  dispatch(setEmpLoading(true));
  try {
    const result = await iota.fetchAllUsers();
    if (result.status === 200) {
      dispatch(setAllEmployee(result.data));
      dispatch(setEmpLoading(false));
    }
    return result;
  } catch (error) {
    dispatch(setEmpError(true));
    dispatch(
      setEmpMessage(error?.response?.data?.message ?? 'Something Happened'),
    );
    dispatch(setEmpLoading(false));

    return error.response;
  }
};

export const insertEmployee = (data) => async (dispatch) => {
  setHeader();
  dispatch(setEmpLoading(true));
  try {
    const result = await iota.insertUser(data);
    if (result.status === 200) {
      swal(
        'Yeay',
        result?.data?.message ?? 'Insert user has been successfully',
        'success',
      );
      dispatch(
        setEmpMessage(
          result?.data?.message ?? 'Insert user has been successfully',
        ),
      );
      dispatch(setEmpLoading(false));
      return result;
    }
  } catch (error) {
    dispatch(setEmpError(true));
    dispatch(
      setEmpMessage(error?.response?.data?.message ?? 'Something Happened'),
    );
    swal(
      'Oh No!',
      error?.response?.data?.message?.length > 1
        ? error?.response?.data?.message.join(', \n')
        : error?.response?.data?.message.join(' '),
      'error',
    );
    dispatch(setEmpLoading(false));

    return error.response;
  }
};

export const updateEmployee = (id, data) => async (dispatch) => {
  setHeader();
  dispatch(setEmpLoading(true));
  try {
    const result = await iota.updateUser(id, data);
    if (result.status === 200) {
      dispatch(
        setEmpMessage(
          result?.data?.message ?? 'Update user has been successfully',
        ),
      );
      swal(
        'Yeay',
        result?.data?.message ?? 'Update user has been successfully',
        'success',
      );
      dispatch(setEmpLoading(false));
      return result;
    }
  } catch (error) {
    dispatch(setEmpError(true));
    dispatch(
      setEmpMessage(error?.response?.data?.message ?? 'Something Happened'),
    );
    swal(
      'Oh No!',
      error?.response?.data?.message?.length > 1
        ? error?.response?.data?.message.join(', \n')
        : error?.response?.data?.message.join(' '),
      'error',
    );
    dispatch(setEmpLoading(false));

    return error.response;
  }
};
