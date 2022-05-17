import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { Loading } from '../../components/atoms';

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
      setMessage('Password anda kuat');
    } else {
      setIsStrong(false);
      setMessage('Password anda lemah!');
    }
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    setloading(false);
  };

  return FORGET?.phone && FORGET?.token ? (
    <>
      {/* Heading Login */}
      <div className="relative inset-x-0 xl:mt-16 mt-10">
        <h2 className=" font-normal mt-1 text-zinc-700">
          Masukkan password baru anda!
        </h2>
      </div>
      <form
        onSubmit={handlerSubmit}
        className="relative w-full flex flex-col gap-4">
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

        <div className="relative flex justify-center items-center w-full mt-12">
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-zinc-400 hover:text-zinc-700 transition-all duration-300 ease-in-out text-sm  text-center">
            Kembali ke halaman login
          </button>
        </div>
      </form>
    </>
  ) : (
    <div className="mt-8 flex flex-col gap-8 justify-center items-center">
      <p className="text-sm font-medium text-red-500 text-center">
        Anda belum mendapatkan kode OTP, silahkan masukkan nomer WhatsApp anda
        terlebih dahulu!{' '}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer text-sm font-semibold text-zinc-500 hover:text-zinc-700 mt-4">
        Kembali
      </button>
    </div>
  );
}
