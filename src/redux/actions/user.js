import Cookies from 'js-cookie';
import * as type from '../types/user';

export const setSession = (data) => ({
  type: type.SESSION,
  payload: data,
});

export const setProfile = (data) => ({
  type: type.PROFILE,
  payload: data,
});

export const loginUser = (data) => async (dispatch) => {
  if (data.username.toLowerCase() === 'leader') {
    dispatch(
      setProfile({
        nama: 'Leader',
        role: 'telkom',
      }),
    );
  } else if (data.username.toLowerCase() === 'manar') {
    dispatch(
      setProfile({
        nama: 'Manar',
        role: 'admin',
      }),
    );
  } else {
    dispatch(
      setProfile({
        nama: data.username,
        role: 'user',
      }),
    );
  }

  dispatch(setSession(btoa(data.username)));

  Cookies.set('session', btoa(data.username), { expires: 0.5 });
  Cookies.remove('redirect');

  return {
    status: 200,
    message: 'Login Berhasil!',
  };
};
