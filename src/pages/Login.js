import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { getImageFromAssets } from '../helpers/assetHelpers';
import { userLogin } from '../redux/actions/user';

export default function Login() {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);

  const [input, setinput] = useState({
    nik: '',
    password: '',
  });

  const handlerOnchange = (event) => {
    setinput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    return dispatch(userLogin(input))
      .then((res) => {
        // swal('Yeay', 'Login Berhasil', 'success');
        // navigate(location.state?.from?.pathname || '/', { replace: true });
        if (res.status === 200) {
          swal('Yeay', res.data.message ?? 'Login Berhasil', 'success');
          navigate(location.state?.from?.pathname || '/', { replace: true });
        } else {
          swal('Oh No!', res.data.message ?? 'Something Happened!', 'error');
        }
      })
      .catch((err) => {
        console.log(err);
        swal('Oh No!', 'Something Happened!', 'error');
      });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex">
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="absolute inset-x-0 lg:w-1/2  px-8 lg:px-12 top-4 lg:top-8">
            <div className="flex justify-between items-center">
              <img
                className="h-14 lg:h-20 w-auto"
                src={getImageFromAssets('/assets/telkom.png')}
                alt=""
              />
              <img
                className="h-9 lg:h-12 w-auto"
                src={getImageFromAssets('/assets/pins.png')}
                alt=""
              />
            </div>
          </div>

          <div className="fixed inset-x-0 lg:w-1/2  px-4 lg:px-12 bottom-4 lg:bottom-8">
            <div className="flex justify-center items-center">
              <p className="text-xs text-zinc-400">© Copyright PINS 2022.</p>
            </div>
          </div>
          <div className="lg:mx-auto w-full max-w-md lg:w-96 bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg">
            <div className="block">
              <img
                className="h-8 w-auto"
                src={getImageFromAssets('/assets/logo.svg')}
                alt=""
              />
            </div>

            <div className="mt-12 lg:mt-32">
              <h1 className="text-xl lg:text-3xl font-semibold text-zinc-800">
                Log in
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Welcome back, please login to continue!
              </p>
            </div>

            <div className="mt-4">
              <div className="mt-6">
                <form onSubmit={handlerSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      NIK
                    </label>
                    <div className="mt-1">
                      <input
                        name="nik"
                        type="text"
                        autoComplete="off"
                        onChange={(e) => handlerOnchange(e)}
                        value={input.nik}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 font-medium text-zinc-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative mt-1">
                      <input
                        id="password"
                        name="password"
                        type={!showPassword ? 'password' : 'text'}
                        autoComplete="current-password"
                        onChange={(e) => handlerOnchange(e)}
                        value={input.password}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 font-medium text-zinc-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-indigo-500"
                      />
                      <span
                        className="absolute top-3 right-4"
                        onClick={() => setshowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeIcon className="h-5 text-zinc-400" />
                        ) : (
                          <EyeOffIcon className="h-5 text-zinc-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <p className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot your password?
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1 bg-slate-50">
          <div className="min-h-screen flex flex-col space-y-6 justify-center items-center lg:px-12 xl:px-24">
            <img
              className="h-96"
              src={getImageFromAssets('/assets/ilustrasi.svg')}
              alt=""
            />
            <h1 className="text-center text-xl font-bold text-zinc-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="text-center text-sm text-zinc-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              et autem consectetur delectus! Nam iure suscipit laborum tempore
              odit nobis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
