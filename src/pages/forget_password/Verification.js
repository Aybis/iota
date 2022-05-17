import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/atoms';

export default function Verification() {
  const navigate = useNavigate();
  const [otp, setotp] = useState('');
  const dispatch = useDispatch();
  const FORGET = useSelector((state) => state.forget);

  const [loading, setloading] = useState(false);
  const [disabled, setdisabled] = useState(true);

  const handlerChangeInput = async (event) => {
    const value = event.target.validity.valid ? event.target.value : otp;
    setotp(value);
    setloading(false);
    setdisabled(false);
    dispatch();
  };

  return FORGET.phone.length > 1 ? (
    <>
      {/* Heading Login */}
      <div className="relative inset-x-0 xl:mt-16 mt-10">
        <h2 className=" font-normal mt-1 text-zinc-700">
          Masukkan kode OTP yang dikirim ke nomer WhatsApp anda.
        </h2>
      </div>

      <div>
        <div className="relative w-full mb-8">
          <input
            type="text"
            pattern="[0-9]*"
            onChange={handlerChangeInput}
            name="otp"
            disabled={loading}
            value={otp}
            autoComplete="off"
            maxLength={6}
            readOnly={loading}
            className="disabled:opacity-40 disabled:bg-zinc-200 disabled:cursor-not-allowed appearance-none w-full placeholder-slate-300 focus:ring-blue-500 focus:border-blue-500 flex-grow block rounded-md text-lg border-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={[
            'disabled:opacity-40 flex gap-2 justify-center items-center bg-blue-600 p-2 rounded-md text-white font-semibold text-lg w-full -mt-2',
            disabled && 'cursor-not-allowed bg-opacity-40',
            loading && 'cursor-not-allowed',
          ].join(' ')}>
          {loading && <Loading color="text-white" height={6} />}
          Verification
        </button>

        <div className="relative flex justify-center items-center w-full mt-12">
          <button
            onClick={() => navigate(-1)}
            className="font-medium text-zinc-400 hover:text-zinc-700 transition-all duration-300 ease-in-out text-sm  text-center">
            Kembali
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="mt-8 flex flex-col gap-8 justify-center items-center">
      <p className="text-sm font-medium text-red-500 text-center">
        Anda belum mendapatkan kode OTP, silahkan masukkan nomer WhatsApp anda
        terlebih dahulu!{' '}
      </p>
      <button
        onClick={() => navigate('/forget')}
        className="cursor-pointer text-sm font-semibold text-zinc-500 hover:text-zinc-700 mt-4">
        Kembali
      </button>
    </div>
  );
}
