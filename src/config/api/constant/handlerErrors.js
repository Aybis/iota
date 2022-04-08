import Cookies from 'js-cookie';

import ToastHandler from '../../../helpers/toast';

export default function handlerErrors(error) {
  if (error) {
    let message;
    if (error.response) {
      const originalRequest = error.config;
      // if (error.response.status === 500) {
      //   message = 'Something went terribly wrong';
      //   ToastHandler('warning', error.response.data.message);
      // } else
      if (error.response.status === 401 && !originalRequest._retry) {
        ToastHandler('error', error.response.data.message);
        Cookies.remove('session');
        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        message = error.response.data.message;
      }

      if (typeof message === 'string') {
        ToastHandler('error', message);
      }

      return Promise.reject(error);
    }
  }
}
