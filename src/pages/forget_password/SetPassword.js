import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import validator from 'validator';
import { Loading } from '../../components/atoms';
import { getImageFromAssets } from '../../helpers/assetHelpers';
import { setNewPassword } from '../../redux/actions/forget';

export default function SetPassword() {
  const navigate = useNavigate();
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [isPassword, setisPassword] = useState(true);
  const [message, setMessage] = useState('');
  const [isStrong, setIsStrong] = useState();
  const FORGET = useSelector((state) => state.forget);

  const validate = (value) => {
    setpassword(value);

    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setIsStrong(true);
      setMessage('Your password is stromg');
    } else {
      setIsStrong(false);
      setMessage('Your password to weak!');
    }
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    return await setNewPassword({
      phone: FORGET?.userTemp?.phone,
      password: password,
    })
      .then((res) => {
        swal('Yeay!', res.message, 'success');
        setloading(false);
        setTimeout(() => {
          navigate('/login');
        }, 300);
      })
      .catch((err) => {
        swal('Oh No!', err?.message ?? 'Something Happened!', 'error');

        setloading(false);
      });
  };

  return FORGET?.userTemp?.phone && FORGET?.token ? (
    <div className="relative mx-auto container max-w-md bg-white flex flex-col justify-center p-4 min-h-screen h-full">
      <div className="absolute max-w-md w-full px-8 top-4 lg:top-8">
        <div className="flex justify-between items-center">
          <img
            className="h-14 lg:h-20 w-auto -ml-6"
            src={getImageFromAssets('/assets/telkom.png')}
            alt=""
          />
          <img
            className="h-9 lg:h-12 w-auto lg:mr-2"
            src={getImageFromAssets('/assets/pins.png')}
            alt=""
          />
        </div>
      </div>
      {/* Heading Login */}
      <div className="relative -mt-24">
        <div className="block mb-14">
          <img
            className="h-8 w-auto"
            src={getImageFromAssets('/assets/logo.svg')}
            alt=""
          />
        </div>
        <h1 className="text-xl xl:text-2xl font-semibold text-zinc-900">
          Set New Password.
        </h1>
        <h2 className="text-sm font-normal mt-1 text-zinc-700">
          Type your new password.
        </h2>
      </div>

      <form
        onSubmit={handlerSubmit}
        className="relative w-full flex flex-col gap-4 mt-4">
        <div className="mt-2 rounded-md  flex relative flex-col w-full">
          <input
            type={isPassword ? 'password' : 'text'}
            name="password"
            onChange={(event) => validate(event.target.value)}
            value={password}
            autoComplete="off"
            className="appearance-none shadow-sm placeholder-slate-300 focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full rounded-md text-lg border-gray-300"
          />
          <span
            onClick={() => setisPassword(!isPassword)}
            className="absolute right-4 top-3 cursor-pointer">
            {isPassword ? (
              <EyeIcon className="text-zinc-400 h-6" />
            ) : (
              <EyeOffIcon className="text-zinc-400 h-6" />
            )}
          </span>
          {password.length > 0 && (
            <span
              className={[
                ' text-sm font-semibold mt-4',
                isStrong ? 'text-green-500' : 'text-red-400',
              ].join(' ')}>
              {message}
            </span>
          )}
          <span className="text-xs text-zinc-500 mt-4">
            * Password harus mengandung minimal 8 karakter, 1 angka, 1 huruf
            besar, 1 simbol dan tidak boleh sama dengan password sebelumnya.
          </span>
        </div>

        {isStrong && (
          <div className="relative mt-2">
            <button
              disabled={loading}
              className={[
                'disabled:bg-opacity-40 flex gap-2 w-full justify-center items-center px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out text-yellow-50 font-semibold focus:bg-blue-600',
                loading && 'cursor-not-allowed',
              ].join(' ')}>
              {loading && <Loading color={'text-white'} height={5} width={5} />}
              Submit
            </button>
          </div>
        )}
      </form>
      <div className="relative flex justify-center items-center w-full mt-12">
        <button
          onClick={() => navigate(-1)}
          className=" text-zinc-400 hover:text-zinc-700 transition-all duration-300 ease-in-out text-sm  text-center cursor-pointer pb-1">
          Back
        </button>
      </div>
    </div>
  ) : (
    <div className="mt-8 flex flex-col gap-8 justify-center items-center min-h-screen max-w-md container mx-auto bg-white">
      <p className="text-lg font-medium text-red-500 text-center">
        Anda belum mendapatkan kode OTP, silahkan masukkan nomer WhatsApp anda
        terlebih dahulu!{' '}
      </p>
      <button
        onClick={() => navigate('/forgot')}
        className="cursor-pointer text-sm font-semibold text-zinc-500 hover:text-zinc-700 mt-4">
        Kembali
      </button>
    </div>
  );
}
