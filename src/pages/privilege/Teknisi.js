import {
  BadgeCheckIcon,
  ClockIcon,
  MenuAlt2Icon,
  TruckIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SectionProgressCircle,
  SkeletonTask,
} from '../../components/molecules';
import SectionActivity from '../../components/SectionActivity';
import {
  getImageFromAssets,
  imageApiAvatarUser,
} from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import { checkAbsensi } from '../../redux/actions/absen';
import {
  fetchActivityDoneByUser,
  fetchActivityPendingByUser,
  fetchActivityProgressByUser,
  setTempAct,
} from '../../redux/actions/activity';
import Layout from '../includes/Layout';
import Profile from '../Profile';

export default function Teknisi() {
  const USER = useSelector((state) => state.user);
  const ACTIVITY = useSelector((state) => state.activity);
  const [tabActive, setTabActive] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [profile, setprofile] = useState(false);
  const dispatch = useDispatch();

  const tabNavigation = [
    {
      id: 1,
      name: 'Pending',
      icon: TruckIcon,
    },
    {
      id: 2,
      name: 'To do',
      icon: TruckIcon,
    },
    {
      id: 3,
      name: 'Completed',
      icon: BadgeCheckIcon,
    },
  ];

  const handlerSetTabActive = (item) => {
    setTabActive(item.id);
    setisLoading(true);

    setTimeout(() => {
      setisLoading(false);
    }, 200);
  };

  useEffect(() => {
    dispatch(fetchActivityPendingByUser({ user_id: USER?.profile?.id }));

    dispatch(
      fetchActivityProgressByUser({
        user_id: USER?.profile?.id,
        date: convertDate('tanggalFormat'),
      }),
    );

    dispatch(
      fetchActivityDoneByUser({
        user_id: USER?.profile?.id,
        date: convertDate('tanggalFormat'),
      }),
    );

    dispatch(checkAbsensi(USER?.profile?.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <Profile open={profile} handlerOpen={() => setprofile(false)} />

      {/* Section Header */}
      <div className="relative flex flex-row-reverse justify-between px-4 inset-x-0 mt-6">
        <div className="flex space-x-2">
          <img
            src={imageApiAvatarUser(USER?.profile?.name ?? 'Anonymous')}
            className="h-10 w-10 rounded-md object-cover"
            alt=""
          />
          <div className=" flex-col items-start hidden">
            <p className="text-xs text-zinc-400">Welcome back,</p>
            <p className="font-semibold capitalize text-sm text-zinc-800 ">
              {USER?.profile?.name?.toLowerCase() ?? 'Anonymous'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setprofile(true)}
          className="flex flex-col justify-center items-center">
          <MenuAlt2Icon className="h-8 text-zinc-400" />
        </button>
      </div>

      <div className="relative m-4">
        <h4 className="text-sm text-zinc-500">Welcome,</h4>
        <h1 className="text-2xl font-semibold text-zinc-800 capitalize">
          {USER?.profile?.name?.toLowerCase() ?? 'Anonymous'}
        </h1>
      </div>

      <>
        {/* Section CTA */}
        <div className="relative m-4 mt-8">
          <div className="bg-white rounded-lg flex justify-between">
            <div className="flex flex-col justify-evenly pl-4 py-2">
              <div>
                <p className="text-lg font-bold text-zinc-800">
                  Sudahkah anda,
                </p>
                <p className="text-lg font-bold -mt-1 text-red-600">
                  Presensi <span className="text-zinc-800">hari ini!</span>
                </p>
              </div>
              <p className="text-xs text-zinc-500">
                Budayakan disiplin absensi dari sekarang!
              </p>
            </div>
            <img
              src={getImageFromAssets('/assets/absen_ilustrasi.svg')}
              className=" -mt-4"
              style={{ height: '9.4rem' }}
              alt=""
            />
          </div>
        </div>

        <div className="relative bg-white my-8 mx-4 rounded-lg  hidden">
          <div className="flex w-full">Test</div>
          <div className="flex flex-1 w-12 ">
            <p className="">Add Task</p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="relative my-8">
          <div className="px-4 mb-4">
            <h1 className="to-zinc-800 font-semibold">Activity Summary</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3 mx-4">
            <div className="flex justify-between items-center px-8 col-span-2 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-400 p-3 rounded-lg">
              <div>
                <h1 className="text-xl font-bold text-white">
                  Task's progress summary
                </h1>
                <p className="mt-1 text-sm text-zinc-100 font-medium">
                  {ACTIVITY?.activitiesByUserDone?.length} of{' '}
                  {ACTIVITY?.activitiesByUserDone?.length +
                    ACTIVITY?.activitiesByUserProgress?.length}{' '}
                  completed
                </p>
              </div>
              <SectionProgressCircle
                value={ACTIVITY?.activitiesByUserDone?.length}
                total={
                  ACTIVITY?.activitiesByUserDone?.length +
                  ACTIVITY?.activitiesByUserProgress?.length
                }
              />
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg px-4 py-3 shadow-lg shadow-amber-500/50 flex flex-col justify-between space-y-4">
              <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
                <TruckIcon className="text-amber-500 h-7" />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-zinc-50 text-sm font-medium">To do</p>
                <p className="text-2xl font-bold text-white">
                  {ACTIVITY?.activitiesByUserProgress?.length ?? 0}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-lg px-4 py-3 shadow-lg shadow-teal-500/50 flex flex-col justify-between">
              <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
                <BadgeCheckIcon className="text-teal-500 h-7" />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-zinc-50 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-white">
                  {ACTIVITY?.activitiesByUserDone?.length ?? 0}{' '}
                </p>
              </div>
            </div>
            <div className="mt-1 flex space-x-4 items-center p-4 col-span-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
              <div>
                <ClockIcon className="h-12 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-zinc-100">Pending</h1>
                <p className="mt-1 text-2xl font-bold text-white">
                  {ACTIVITY?.activitiesByUserPending?.filter(
                    (item) =>
                      convertDate('tanggalHari', item.created_at) !==
                      convertDate('tanggalHari'),
                  )?.length ?? 0}
                  <small className="text-sm font-normal text-zinc-100">
                    {' '}
                    activity
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Overview Section */}
        <div className="relative my-8">
          <div className="px-4 mb-4">
            <h1 className="to-zinc-800 font-semibold">Task Overview</h1>
          </div>
          <div className="relative flex overflow-x-scroll scroll-smooth hidden-scroll space-x-4 pl-4 border-b-2 border-zinc-100 pb-2">
            {tabNavigation.map((item, index) => (
              <div
                key={index}
                onClick={() => handlerSetTabActive(item)}
                className={[
                  'flex flex-none cursor-pointer w-fit px-4 py-2 rounded-md font-medium text-sm justify-center items-center',
                  tabActive === item.id
                    ? 'bg-blue-600 shadow-md shadow-blue-500/50 text-white font-semibold'
                    : 'bg-zinc-200 text-zinc-400 font-medium',
                ].join(' ')}>
                {item.name}{' '}
                <div className="text-xs ml-2 font-medium bg-white text-zinc-700 p-1 rounded-full flex justify-center items-center">
                  {item.id === 1
                    ? ACTIVITY?.activitiesByUserPending?.filter(
                        (item) =>
                          convertDate('tanggalHari', item.created_at) !==
                          convertDate('tanggalHari'),
                      )?.length
                    : item.id === 2
                    ? ACTIVITY?.activitiesByUserProgress?.length
                    : ACTIVITY?.activitiesByUserDone?.length}
                </div>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-b from-zinc-100 to-zinc-50 p-4 scroll-smooth transition-all duration-300 ease-in-out">
            {ACTIVITY?.isLoading ? (
              <SkeletonTask />
            ) : (
              <div className="grid grid-cols-1 gap-4 min-h-full max-h-fit transition-all duration-300 ease-in-out scroll-smooth">
                {isLoading ? (
                  <SkeletonTask />
                ) : (tabActive === 1
                    ? ACTIVITY?.activitiesByUserPending?.filter(
                        (item) =>
                          convertDate('tanggalHari', item.created_at) !==
                          convertDate('tanggalHari'),
                      )
                    : tabActive === 2
                    ? ACTIVITY?.activitiesByUserProgress
                    : ACTIVITY?.activitiesByUserDone
                  )?.length > 0 ? (
                  (tabActive === 1
                    ? ACTIVITY?.activitiesByUserPending?.filter(
                        (item) =>
                          convertDate('tanggalHari', item.created_at) !==
                          convertDate('tanggalHari'),
                      )
                    : tabActive === 2
                    ? ACTIVITY?.activitiesByUserProgress
                    : ACTIVITY?.activitiesByUserDone
                  ).map((item) => (
                    <SectionActivity
                      handlerClick={() => dispatch(setTempAct(item))}
                      key={Math.random()}
                      idActivity={item?.id}
                      totalUpdate={item?.progress_detail}
                      date={item?.created_at}
                      desc={item?.description}
                      title={item?.title}
                      progress={item?.progress}
                    />
                  ))
                ) : (
                  <div className="p-4 text-sm flex justify-center items-center text-zinc-400">
                    Tidak ada data
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
}
