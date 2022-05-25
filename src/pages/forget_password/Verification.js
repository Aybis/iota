import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Loading } from '../../components/atoms';
import { getImageFromAssets } from '../../helpers/assetHelpers';
import { verifOtp } from '../../redux/actions/forget';

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
    if (value.length === 6) {
      try {
        setdisabled(false);
        setloading(true);
        const result = await dispatch(
          verifOtp({ phone: FORGET?.userTemp?.phone, token: value }),
        );
        if (result.status === 200) {
          swal('Yeayy!', result.message, 'success');
          setTimeout(() => {
            navigate('/forgot/password');
          }, 300);
        } else {
          setdisabled(true);
          setloading(false);
          swal('Oh No!', result.message, 'error');
        }
      } catch (error) {
        setdisabled(true);
        setloading(false);
        swal('Oh No!', error.message ?? 'Something Happened!', 'error');
      }
    } else {
      setdisabled(true);
      setloading(false);
    }
  };

  return FORGET?.userTemp?.phone?.length > 1 ? (
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
          Verification.
        </h1>
        <h2 className="text-sm font-normal mt-1 text-zinc-700">
          Enter the OTP code sent to your WhatsApp number.
        </h2>
      </div>

      <form className="relative w-full flex flex-col gap-4 mt-4">
        <div className="mt-2 rounded-md shadow-sm flex w-full">
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
        <div className="relative mt-2">
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
        </div>
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
