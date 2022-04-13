import {
  ArrowNarrowLeftIcon,
  PencilIcon,
  PlusIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SectionHistoryActivity, SectionTextArea } from '../components';
import { Loading, Modals } from '../components/atoms';
import { SectionProgressCircle } from '../components/molecules';
import {
  getImageFromAssets,
  getImageFromStorage,
} from '../helpers/assetHelpers';
import { convertDate } from '../helpers/convertDate';
import {
  fetchHistoryProgress,
  updateActivity,
} from '../redux/actions/activity';
import Layout from './includes/Layout';

export default function DetailActivity() {
  const navigate = useNavigate();
  const { activity } = useParams();
  const [showModalUpdated, setshowModalUpdated] = useState(false);
  const ACTIVITY = useSelector((state) => state.activity);
  const USER = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  const handlerClickShowImage = (item) => {
    setshowModal(true);
    setImageSource(item.photo);
  };

  const handlerClickShowModalUpdate = () => {
    setshowModalUpdated(true);
    formInput.description = ACTIVITY?.historyActivity?.description;
    formInput.title = ACTIVITY?.historyActivity?.title;
  };

  const [formInput, setformInput] = useState({
    title: '',
    description: '',
    user_id: USER?.profile?.id,
  });

  const handlerChangInput = (event) => {
    setformInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmitEditActivity = async (event) => {
    setisLoading(true);
    event.preventDefault();

    await dispatch(updateActivity(formInput, activity))
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchHistoryProgress(activity));
        }
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    dispatch(fetchHistoryProgress(activity));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activity]);

  return ACTIVITY?.isLoading ? (
    <div className="relative min-h-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <Layout showBottomBar={false}>
      {/* Section Header */}
      <div className="relative mx-4 mt-6 mb-6 flex items-center justify-between">
        <div
          className="relative cursor-pointer hover:bg-white rounded-lg transition-all duration-300 ease-out text-zinc-600"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
        </div>
        {ACTIVITY?.historyActivity?.progress < 100 && (
          <button
            onClick={() => handlerClickShowModalUpdate()}
            className="h-8 w-8 rounded-lg bg-green-600 flex justify-center items-center shadow-lg shadow-green-500/50">
            <PencilIcon className="h-6 text-white" />
          </button>
        )}
      </div>

      <div className="relative flex justify-between my-4 p-4">
        <div className="flex flex-col flex-none w-64">
          <h1 className="text-lg font-semibold text-zinc-700 capitalize">
            {ACTIVITY?.historyActivity?.title}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            {convertDate('namaHari', ACTIVITY?.historyActivity?.created_at)},{' '}
            {`${convertDate(
              'tanggal',
              ACTIVITY?.historyActivity?.created_at,
            )} ${convertDate(
              'namaBulan',
              ACTIVITY?.historyActivity?.created_at,
            )} ${convertDate('tahun', ACTIVITY?.historyActivity?.created_at)}`}
          </p>

          <div className="relative mt-4 flex items-center">
            {ACTIVITY?.historyActivity?.progress_detail?.length > 0 ? (
              <div className="flex justify-between items-center">
                <div className="flex -space-x-3" key={Math.random()}>
                  {ACTIVITY?.historyActivity?.progress_detail
                    ?.slice(0, 4)
                    .map((item) => (
                      <img
                        key={Math.random()}
                        src={
                          item.photo
                            ? getImageFromStorage(item.photo)
                            : getImageFromAssets('/assets/nfimage.jpeg')
                        }
                        alt=""
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-zinc-100 object-top"
                      />
                    ))}
                </div>
                <p className="text-zinc-500 text-xs font-medium ml-1">
                  {'  '}+{ACTIVITY?.historyActivity?.progress_detail?.length}{' '}
                  updated
                </p>
              </div>
            ) : (
              <p className="text-xs text-zinc-400 font-light"></p>
            )}
          </div>
        </div>
        <div className="text-black mt-2 mr-4">
          <SectionProgressCircle
            fontSize="1.2rem"
            value={ACTIVITY?.historyActivity?.progress}
            total={100}
            width={75}
            colorFinish="#16a34a"
            colorStart="#fbbf24"
            colorProgress="#e7e5e4"
            labelColor="#27272a"
          />
        </div>
      </div>

      <div className="relative p-4 -mt-6">
        <p className="text-sm font-medium text-zinc-800">Description</p>
        <p className="text-sm text-zinc-400 mt-1">
          {ACTIVITY?.historyActivity?.description}
        </p>
      </div>

      <hr className="mx-4 border-zinc-200" />

      <div className="relative my-8 mx-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-zinc-800">
            History Activity{' '}
            <span className="ml-1 text-xs bg-blue-400 text-white px-3 py-1 rounded-full">
              {ACTIVITY?.historyActivity?.progress_detail?.length}
            </span>
          </p>

          {ACTIVITY?.historyActivity?.progress < 100 && (
            <Link
              to={`/add-progress/${activity}`}
              className="flex gap-1 items-center text-sm text-blue-600 font-semibold">
              <PlusIcon className="h-4" />
              Add Progress
            </Link>
          )}
        </div>

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
                <p>Haven't progress yet</p>
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
              : getImageFromAssets('/assets/nfimage.jpeg')
          }
          alt={imageSource}
          className="rounded-lg object-cover lg:h-96"
        />
      </Modals>

      <Modals
        margin={false}
        dontClose={isLoading}
        moreClass="rounded-xl"
        handlerClose={setshowModalUpdated}
        open={showModalUpdated}
        title={'Edit Activity'}>
        <div className="relative">
          <SectionTextArea
            isLoading={isLoading}
            uploadPhoto={false}
            handlerChange={handlerChangInput}
            handlerSubmit={handlerSubmitEditActivity}
            valueDescription={formInput.description}
            valueTitle={formInput.title}
            showTitle={true}
            buttonName="Edit"
          />
        </div>
      </Modals>
    </Layout>
  );
}
