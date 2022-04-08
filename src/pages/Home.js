import ReactCircularSlider from '@fseehawer/react-circular-slider';
import {
  BadgeCheckIcon,
  ClockIcon,
  HomeIcon,
  MenuAlt2Icon,
  OfficeBuildingIcon,
  TruckIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionActivity } from '../components';
import { Loading } from '../components/atoms';
import { SkeletonTask } from '../components/molecules';
import {
  getImageFromAssets,
  imageApiAvatarUser,
} from '../helpers/assetHelpers';
import { convertDate } from '../helpers/convertDate';
import {
  fetchActivityDoneByUser,
  fetchActivityDoneDashboard,
  fetchActivityPendingByUser,
  fetchActivityPendingDashboard,
  fetchActivityProgressByUser,
  fetchActivityProgressDashboard,
  setTempAct,
} from '../redux/actions/activity';
import Layout from './includes/Layout';
import Profile from './Profile';

export default function Home() {
  let arr = [];

  const USER = useSelector((state) => state.user);
  const ACTIVITY = useSelector((state) => state.activity);
  const [tabActive, setTabActive] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [profile, setprofile] = useState(false);
  const [dataActivity, setdataActivity] = useState([]);
  Array.from({ length: 100 }).map((item, index) => arr.push(`${index}%`));

  const dispatch = useDispatch();

  const tabNavigation = [
    {
      id: 1,
      name: 'Pending',
      icon: TruckIcon,
    },
    {
      id: 2,
      name: 'To Do',
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

    if (item.id === 1) {
      setdataActivity(
        ACTIVITY?.activitiesByUserPending?.filter(
          (item) =>
            convertDate('tanggalHari', item.created_at) !==
            convertDate('tanggalHari'),
        ),
      );
    } else if (item.id === 2) {
      setdataActivity(ACTIVITY?.activitiesByUserProgress);
    } else if (item.id === 3) {
      setdataActivity(ACTIVITY?.activitiesByUserDone);
    }
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

    setdataActivity(
      tabActive === 1
        ? ACTIVITY?.activitiesByUserPending?.filter(
            (item) =>
              convertDate('tanggalHari', item.created_at) !==
              convertDate('tanggalHari'),
          )
        : tabActive === 2
        ? ACTIVITY?.activitiesByUserProgress
        : ACTIVITY?.activitiesByUserDone,
    );

    dispatch(
      fetchActivityProgressDashboard({
        regional_id: USER?.profile?.regional_id,
        date: convertDate('tanggalFormat'),
      }),
    );

    dispatch(
      fetchActivityDoneDashboard({
        regional_id: USER?.profile?.regional_id,
        date: convertDate('tanggalFormat'),
      }),
    );

    dispatch(
      fetchActivityPendingDashboard({
        regional_id: USER?.profile?.regional_id,
      }),
    );

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

      {USER?.profile?.role_id === '1' ? (
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
                    {ACTIVITY?.activitiesByUserDone?.length ?? 0} of{' '}
                    {ACTIVITY?.activitiesByUserDone?.length +
                      ACTIVITY?.activitiesByUserProgress?.length}{' '}
                    completed
                  </p>
                </div>
                <div>
                  <ReactCircularSlider
                    width={100}
                    label=" "
                    verticalOffset="0"
                    labelColor="#fff"
                    knobColor="#005a58"
                    progressColorFrom="#fcd34d"
                    progressColorTo="#f59e0b"
                    progressSize={10}
                    trackColor="#fffbeb"
                    trackSize={5}
                    valueFontSize="2rem"
                    max={100}
                    min={0}
                    data={arr} //...
                    dataIndex={
                      (ACTIVITY?.activitiesByUserDone?.length /
                        (ACTIVITY?.activitiesByUserDone?.length +
                          ACTIVITY?.activitiesByUserProgress?.length)) *
                      100
                    }
                    hideKnob={true}
                    knobDraggable={false}
                  />
                </div>
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

            {ACTIVITY?.isLoading ? (
              <div className="flex justify-center items-center p-4">
                <Loading height={5} width={5} />
              </div>
            ) : (
              <div className="relative bg-gradient-to-b from-zinc-100 to-zinc-50 p-4 scroll-smooth transition-all duration-300 ease-in-out">
                <div className="relative">
                  {isLoading ? (
                    <SkeletonTask />
                  ) : (
                    <div className="grid grid-cols-1 gap-4 min-h-full max-h-fit transition-all duration-300 ease-in-out scroll-smooth">
                      {dataActivity?.length > 0 ? (
                        dataActivity?.map((item) => (
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
                        <div className="flex justify-center items-center p-4 text-sm text-zinc-500">
                          Tidak ada data
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="relative my-2">
          <div className="relative bg-white mx-4 p-3 rounded-lg">
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-3 bg-amber-400 rounded"></div>
                <p className="font-medium text-zinc-600 text-sm">Overview</p>
              </div>
              <select
                name=""
                id=""
                className="border border-zinc-200 pr-6 py-1 text-xs rounded-md"
                defaultValue={'Today'}
                placeholder="Today">
                <option value="Today">Today</option>
                {/* <option value="month">This Month</option> */}
              </select>
            </div>
            {/* End Section Headear */}

            <div className="mt-6 flex space-x-4 items-center p-4 col-span-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
              <div>
                <ClockIcon className="h-12 text-white" />
              </div>
              <div>
                <h1 className=" font-bold text-zinc-100">Pending</h1>
                <p className="mt-1 text-2xl font-bold text-white">
                  {ACTIVITY?.dashboardActPending?.value}
                  <small className="text-sm font-normal text-zinc-100">
                    {' '}
                    activity
                  </small>
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center px-8 col-span-2 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-400 p-3 rounded-lg">
              <div>
                <h1 className="text-xl font-bold text-white">
                  Today activity summary
                </h1>
                <p className="mt-1 text-sm text-zinc-100 font-medium">
                  {ACTIVITY?.dashboardActDone?.value} of{' '}
                  {ACTIVITY?.dashboardActProgress?.value +
                    ACTIVITY?.dashboardActDone?.value}{' '}
                  completed
                </p>
              </div>
              <div>
                <ReactCircularSlider
                  width={100}
                  label=" "
                  verticalOffset="0"
                  labelColor="#fff"
                  knobColor="#005a58"
                  progressColorFrom="#fcd34d"
                  progressColorTo="#f59e0b"
                  progressSize={10}
                  trackColor="#fffbeb"
                  trackSize={5}
                  valueFontSize="2rem"
                  max={100}
                  min={0}
                  data={arr} //...
                  dataIndex={
                    (ACTIVITY?.dashboardActDone?.value /
                      (ACTIVITY?.dashboardActProgress?.value +
                        ACTIVITY?.dashboardActDone?.value)) *
                    100
                  }
                  hideKnob={true}
                  knobDraggable={false}
                />
              </div>
            </div>

            <div className="relative grid grid-cols-2 p-3 rounded-xl bg-amber-500 mt-6">
              <div className="flex flex-col p-3">
                <p className="font-medium text-white">Total Activity</p>
                <h1 className="text-4xl text-white font-bold">
                  {ACTIVITY?.dashboardActProgress?.value +
                    ACTIVITY?.dashboardActDone?.value}
                </h1>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                <div className="flex flex-col space-y-1 items-start text-sm font-semibold ">
                  <BadgeCheckIcon className="h-4 text-teal-600" />
                  <p className="text-zinc-600 text-lg font-semibold">
                    {ACTIVITY?.dashboardActDone?.value}
                  </p>
                  <p className="text-xs font-light text-zinc-500">Complete</p>
                </div>
                <div className="flex flex-col space-y-1 items-start text-sm font-semibold ">
                  <TruckIcon className="h-4 text-amber-600" />
                  <p className="text-zinc-600 text-lg font-semibold">
                    {ACTIVITY?.dashboardActProgress?.value}
                  </p>
                  <p className="text-xs font-light text-zinc-500">To do</p>
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-2 p-2 gap-1 bg-zinc-100 rounded-xl mt-6">
              <div className="flex flex-col rounded-xl justify-start p-4">
                <p className="font-medium text-zinc-500 text-sm">Absensi</p>
                <h1 className="font-semibold text-4xl text-zinc-800">130</h1>
                <p className="mt-2 px-2 py-1 text-blue-600 bg-blue-50 rounded-full text-xs w-fit">
                  Kehadiran
                </p>
              </div>
              <div className="flex flex-col bg-white shadow-lg rounded-lg justify-start p-4">
                <p className="font-medium text-zinc-500 text-sm">Absensi</p>
                <h1 className="font-semibold text-4xl text-zinc-800">40</h1>
                <p className="mt-2 px-2 py-1 text-red-600 bg-red-50 rounded-full text-xs w-fit">
                  Terlambat
                </p>
              </div>
            </div>

            <div className="relative grid grid-cols-2 p-3 rounded-xl bg-blue-500 mt-6">
              <div className="flex flex-col p-3">
                <p className="font-medium text-white">Total Absensi</p>
                <h1 className="text-4xl text-white font-bold">130</h1>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                <div className="flex flex-col space-y-1 items-start text-sm font-semibold ">
                  <HomeIcon className="h-4 text-blue-600" />
                  <p className="text-zinc-600 text-lg font-semibold">80</p>
                  <p className="text-xs font-light text-zinc-500">At Home</p>
                </div>
                <div className="flex flex-col space-y-1 items-start text-sm font-semibold ">
                  <OfficeBuildingIcon className="h-4 text-green-600" />
                  <p className="text-zinc-600 text-lg font-semibold">50</p>
                  <p className="text-xs font-light text-zinc-500">At Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
