import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { ButtonCustom } from '../../components/atoms';
import { getImageFromAssets } from '../../helpers/assetHelpers';
import { getOtp, setUserTemp } from '../../redux/actions/forget';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setphone] = useState('');
  const [loading, setloading] = useState(false);

  const handlerChangeInput = (event) => {
    const value = event.target.validity.valid ? event.target.value : phone;
    setphone(value);
  };

  const handlerGetOtp = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const result = await dispatch(getOtp(phone));
      if (result.status === 200) {
        swal('Yeay!', result.data.message, 'success');

        setTimeout(() => {
          navigate('/forgot/verification');
        }, 300);
      } else {
        swal('Oh No!', result?.message ?? 'Something Happened!', 'error');
      }
    } catch (error) {
      swal('Oh No!', error?.message ?? 'Something Happened!', 'error');
    }

    setloading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      Cookies.remove('forgotUser');
      dispatch(setUserTemp(null));
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
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
          Forgot Password.
        </h1>
        <h2 className=" font-normal mt-1 text-zinc-700">
          Type your WhatsApp number.
        </h2>
      </div>

      <form
        className="relative w-full flex flex-col gap-4 mt-4"
        onSubmit={handlerGetOtp}>
        <div className="mt-2 rounded-md shadow-sm flex w-full">
          <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 lg:text-lg">
            +62
          </span>
          <input
            type="text"
            pattern="[0-9]*"
            onInput={handlerChangeInput}
            name="phone"
            value={phone}
            autoComplete="off"
            maxLength={12}
            placeholder="8123456789"
            className="appearance-none placeholder-slate-300 focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full rounded-none rounded-r-md lg:text-lg border-gray-300"
          />
        </div>
        <div className="relative mt-2">
          <ButtonCustom
            isDisabled={phone.length < 8}
            moreClass={'w-full shadow-lg'}
            isSubmit={loading}>
            Dapatkan OTP
          </ButtonCustom>
        </div>
      </form>
      <div className="relative flex justify-center items-center w-full mt-12">
        <button
          onClick={() => navigate(-1)}
          className=" text-zinc-400 hover:text-zinc-700 transition-all duration-300 ease-in-out text-sm  text-center pb-1">
          Back
        </button>
      </div>
    </div>
  );
}
