import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { Slider } from '@mui/material';
import Compressor from 'compressorjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SectionActivity,
  SectionHistoryActivity,
  SectionTextArea,
} from '../components';
import { Loading, Modals } from '../components/atoms';
import {
  getImageFromStorage,
  imageApiAvatarUser,
} from '../helpers/assetHelpers';
import {
  fetchHistoryProgress,
  insertProgressActivity,
} from '../redux/actions/activity';
import Layout from './includes/Layout';

export default function DetailActivity() {
  const navigate = useNavigate();
  const { activity } = useParams();
  const [image, setImage] = useState(null);
  const [isSubmit, setisSubmit] = useState(false);
  const [fileName, setfileName] = useState(null);
  const ACTIVITY = useSelector((state) => state.activity);
  const USER = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showModal, setshowModal] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  const handlerClickShowImage = (item) => {
    setshowModal(true);
    setImageSource(item.photo);
  };

  const [input, setinput] = useState({
    progress: ACTIVITY?.tempActivities?.progress,
    description: '',
    photo: '',
    activity_id: activity,
  });

  const handlerChange = (event) => {
    setinput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const inputPhoto = (event) => {
    let file = event.target.files[0] ? event.target.files[0] : null;
    setfileName(event.target.files[0].name);
    if (!file) {
      return;
    } else {
      new Compressor(file, {
        quality: 0.5,
        convertSize: 5000,
        success: (result) => {
          // setPhoto(URL.createObjectURL(result));
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

  const handlerSubmitProgress = async (event) => {
    input.photo = image;
    setisSubmit(true);
    event.preventDefault();

    const result = await dispatch(insertProgressActivity(input));

    if (result.status === 200) {
      input.description = '';
      input.photo = '';
      setImage(null);
      setfileName(null);
      setisSubmit(false);
    } else {
      setfileName(null);
      setisSubmit(false);
    }
  };

  useEffect(() => {
    dispatch(fetchHistoryProgress(activity));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout showBottomBar={false}>
      {/* Section Header */}
      <div className="relative mx-4 my-4 flex justify-between">
        <div
          className="relative cursor-pointer hover:bg-white rounded-lg transition-all duration-300 ease-out p-2"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
        </div>
        <h1 className="text-lg font-semibold text-zinc-800">Activity Detail</h1>
        <div className="relative">
          <ArrowNarrowLeftIcon className="h-6 text-white" />
        </div>
      </div>

      {/* Section Detail */}
      {ACTIVITY?.isLoading ? (
        <div className="flex justify-center items-center p-4">
          <Loading height={6} width={6} />
        </div>
      ) : ACTIVITY?.tempActivities?.user_id === USER?.profile?.id &&
        ACTIVITY?.historyActivity?.progress < 100 ? (
        <div className="relative mx-4 my-6">
          <p className="font-semibold text-zinc-800">
            Tambah Progress Activity
          </p>
          <div className="relative space-y-3 mt-3 bg-white p-4 rounded-lg shadow-lg shadow-zinc-200/30">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-500">
                Update Progress
              </label>
              <div className="flex space-x-6 items-center px-1">
                <Slider
                  onChange={(e) => handlerChange(e)}
                  value={input?.progress}
                  aria-label="Progress"
                  name="progress"
                  valueLabelDisplay="auto"
                />
                <p className="text-sm text-zinc-400 font-medium">
                  {input?.progress}%
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="deskripsi"
                className="block text-sm font-medium text-zinc-500 mb-3">
                Deskripsi Progress
              </label>
              <SectionTextArea
                handlerChange={handlerChange}
                valueDescription={input.description}
                handlerSubmit={handlerSubmitProgress}
                buttonName="Tambah Progress"
                handlerChangePhoto={(e) => inputPhoto(e)}
                namePhoto={fileName}
                isLoading={isSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative m-4">
          {ACTIVITY?.isLoading ? (
            'wait'
          ) : (
            <SectionActivity
              desc={ACTIVITY?.historyActivity?.description}
              progress={ACTIVITY?.historyActivity?.progress}
              title={ACTIVITY?.historyActivity?.title}
              totalUpdate={ACTIVITY?.historyActivity?.progress_detail}
            />
          )}
        </div>
      )}

      <div className="relative my-8 mx-4">
        <p className="text-sm font-semibold text-zinc-800 mb-4">
          History Activity
        </p>

        <div className="relative">
          <div className="grid grid-cols-1 gap-4 ">
            {ACTIVITY?.historyActivity?.progress_detail?.length > 0 ? (
              ACTIVITY?.historyActivity?.progress_detail?.map((history) => (
                <SectionHistoryActivity
                  key={Math.random()}
                  item={history}
                  title={ACTIVITY?.historyActivity?.title}
                  desc={ACTIVITY?.historyActivity?.description}
                  handlerShowImage={handlerClickShowImage}
                />
              ))
            ) : (
              <div
                key={Math.random()}
                className="p-5 flex justify-center items-center text-sm text-zinc-500 font-medium">
                <p>Belum ada progress</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modals position="center" open={showModal} handlerClose={setshowModal}>
        <img
          src={
            imageSource
              ? getImageFromStorage(imageSource)
              : imageApiAvatarUser('UPD')
          }
          alt={imageSource}
          className="rounded-lg object-cover lg:h-96"
        />
      </Modals>
    </Layout>
  );
}
