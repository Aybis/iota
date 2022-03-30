import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
// import Compressor from 'compressorjs';
// import { motion } from 'framer-motion';
// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { Card, GoogleMaps, InputPhoto, Time } from '../components/atoms';
import FormCheckin from '../components/molecules/FormCheckin';
// import { convertDate } from '../helpers/convertDate';

import Compressor from 'compressorjs';
import { useEffect, useState } from 'react';
import useForm from '../helpers/useForm';
import { convertDate } from '../helpers/convertDate';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Checkin() {
  const navigate = useNavigate();
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [state, setState] = useForm({
    user_id: null,
    lokasi: '',
    long_lat: '',
    photo: '',
    kehadiran: '',
    kondisi: '',
    keterangan: '',
    jam: '',
    is_shift: 0,
  });

  const inputPhoto = (event) => {
    let file = event.target.files[0] ? event.target.files[0] : null;
    if (!file) {
      return;
    } else {
      new Compressor(file, {
        quality: 0.5,
        convertSize: 5000,
        success: (result) => {
          setPhoto(URL.createObjectURL(result));
          createImage(result);
        },
      });
    }
  };

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const sendlongLat = (value) => {
    setlongLat(value);
  };

  const sendAddress = (value) => {
    setAddress(value);
  };

  const handlerKondisi = (event) => {
    if (event.target.name === 'kondisi') {
      state.keterangan = '';
    }
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setisSubmit(true);
    state.long_lat = longLat;
    state.user_id = 1;
    state.photo = image;
    state.lokasi = address;
    state.jam = convertDate('tanggalWaktuLengkap');

    setisSubmit(false);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <motion.div className="flex flex-col min-h-screen h-full bg-zinc-50">
      <motion.div
        initial={{
          top: -50,
          opacity: 0,
        }}
        animate={{
          top: 10,
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 inset-x-0 z-20 px-3">
        <div className="bg-gray-800 bg-blend-multiply backdrop-filter backdrop-blur bg-opacity-40 shadow-xl h-16 py-2 px-4 rounded-lg grid grid-cols-4 w-full place-content-center">
          <div className="flex justify-start items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="active:bg-gray-500 bg-transparent rounded-lg">
              <ArrowNarrowLeftIcon className="h-10 w-10 text-white rounded p-1" />
            </motion.button>
          </div>
          <Time moreClass="col-span-2" />
          <div className="flex justify-center items-center w-full"></div>
        </div>
      </motion.div>
      {/* Kehadiran  */}
      <Card addClass="z-10 mt-24">
        <label htmlFor="Shifting" className=" font-semibold text-zinc-900">
          Lokasi
        </label>
        <GoogleMaps
          height="100%"
          className="relative h-52 rounded-lg z-0 mt-2"
          sendlongLat={sendlongLat}
          sendAddress={sendAddress}
        />

        <div className="bg-white h-auto p-4 rounded-lg z-30 relative mx-4 -mt-12 shadow-lg flex gap-4">
          <div className="h-24 w-24 rounded-lg flex-none">
            <InputPhoto
              photo={photo}
              handlerChangPhoto={(event) => inputPhoto(event)}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <h1
              className={` ${
                !photo ? 'text-red-500' : 'text-warmGray-800'
              } text-sm capitalize font-semibold text-left`}>
              {photo ? 'Abdul Muchtar Astria' : 'Take a Selfie'}
            </h1>
            <p className="text-xs font-light text-warmGray-400 tracking-wide">
              {address}
            </p>
          </div>
        </div>
      </Card>

      <FormCheckin
        handlerKondisi={handlerKondisi}
        handlerSubmit={handlerSubmit}
        state={state}
        setState={setState}
        photo={photo}
        isSubmit={isSubmit}
      />
    </motion.div>
  );
}
