import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastHandler(type, message, time = 2000) {
  if (type === 'success') {
    toast.success(message, {
      className: 'text-zinc-800 font-medium',
      position: 'top-center',
      autoClose: time,
    });
  } else if (type === 'warning') {
    toast.warn(message, {
      className: 'text-zinc-800 font-medium',
      position: 'top-center',
      autoClose: time,
    });
  } else if (type === 'error') {
    toast.error(message, {
      className: 'text-zinc-800 font-semibold',
      position: 'top-center',
      autoClose: time,
      theme: 'colored',
    });
  } else if (type === 'info') {
    toast.info(message, {
      className: 'text-zinc-800 font-medium',
      position: 'top-center',
      autoClose: time,
    });
  } else {
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
