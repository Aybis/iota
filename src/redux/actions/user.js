import Cookies from 'js-cookie';
import iota from '../../config/api/route/iota';
import * as type from '../types/user';
import setHeader from '../../config/api/constant/setHeader';

export const setSession = (data) => ({
  type: type.SESSION,
  payload: data,
});

export const setProfile = (data) => ({
  type: type.PROFILE,
  payload: data,
});

export const userLogin = (data) => async (dispatch) => {
  return await iota
    .login(data)
    .then((res) => {
      Cookies.set('session', res.data.token, { expires: 0.5 });
      Cookies.remove('redirect');
      dispatch(setProfile(res.data.user));
      dispatch(setSession(res.data.token));
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const userLogout = () => async (dispatch) => {
  setHeader();
  return await iota
    .logout()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const loginUser = (data) => async (dispatch) => {
  if (data.nik.toLowerCase() === 'leader') {
    dispatch(
      setProfile({
        name: 'Leader',
        role_id: '3',
      }),
    );
  } else if (data.nik.toLowerCase() === 'manar') {
    dispatch(
      setProfile({
        name: 'Manar',
        role_id: '2',
      }),
    );
  } else {
    dispatch(
      setProfile({
        name: data.nik,
        role_id: '1',
      }),
    );
  }

  dispatch(setSession(btoa(data.nik)));

  Cookies.set('session', btoa(data.nik), { expires: 0.5 });
  Cookies.remove('redirect');

  return {
    status: 200,
    message: 'Login Berhasil!',
  };
};
