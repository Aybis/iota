import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { Slider } from '@mui/material';
import Compressor from 'compressorjs';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ButtonCustom,
  Card,
  GoogleMaps,
  InputPhoto,
  Textarea,
  Time,
} from '../components/atoms';
import useForm from '../helpers/useForm';
import { insertProgressActivity } from '../redux/actions/activity';

export default function AddProgress() {
  const navigate = useNavigate();
  const USER = useSelector((state) => state.user);
  const ACTIVITY = useSelector((state) => state.activity);
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [state, setState] = useForm({
    user_id: USER?.profile?.id,
    lokasi: '',
    long_lat: '',
    photo: '',
    progress: ACTIVITY?.historyActivity?.progress,
    description: '',
    activity_id: ACTIVITY?.historyActivity?.id,
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

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setisSubmit(true);
    state.long_lat = longLat;
    state.user_id = USER?.profile?.id;
    state.photo = image;
    state.lokasi = address;

    await dispatch(insertProgressActivity(state))
      .then((res) => {
        if (res.status === 200) {
          navigate(-1);
        }
        setisSubmit(false);
      })
      .catch((err) => {
        setisSubmit(false);
      });
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              typePhoto={'evidence'}
              photo={photo}
              label="Take Picture"
              handlerChangPhoto={(event) => inputPhoto(event)}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <h1
              className={` ${
                !photo ? 'text-red-500' : 'text-warmGray-800'
              } text-sm capitalize font-semibold text-left`}>
              {photo
                ? USER?.profile?.name?.toLowerCase()
                : 'Take or Pick Evidence'}
            </h1>
            <p className="text-xs font-light text-warmGray-400 tracking-wide">
              {address}
            </p>
          </div>
        </div>
      </Card>

      <form onSubmit={handlerSubmit} className="px-4 relative">
        <div className="relative space-y-3 mt-3 shadow-zinc-200/30">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-zinc-700">
              Update Progress
            </label>
            <div className="flex space-x-6 items-center px-1 rounded-lg">
              <Slider
                onChange={setState}
                value={state?.progress}
                aria-label="Progress"
                name="progress"
                valueLabelDisplay="auto"
              />
              <p className="text-sm text-zinc-400 font-medium">
                {state?.progress}%
              </p>
            </div>
          </div>
        </div>
        <div className="relative space-y-3 mt-3 rounded-lg s0">
          <Textarea
            labelClass={'text-sm'}
            labelName="Progress Description"
            name="description"
            value={state.description}
            onChange={setState}
            placeholder={`Write something`}
          />
        </div>

        <div className="relative px-4 flex justify-center items-center">
          {state?.description?.length > 5 && photo ? (
            <ButtonCustom
              isSubmit={isSubmit}
              moreClass={
                'flex space-x-1 text-sm w-fit shadow-lg shadow-blue-500/50'
              }
              isAnimated={true}>
              <p>Update Progress</p>
            </ButtonCustom>
          ) : (
            ''
          )}
        </div>
      </form>
    </motion.div>
  );
}
