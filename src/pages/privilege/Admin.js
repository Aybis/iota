import {
  BadgeCheckIcon,
  ClockIcon,
  MenuAlt2Icon,
  TruckIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartBar, SectionProgressCircle } from '../../components/molecules';
import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import {
  IconThumbnail,
  imageApiAvatarUser,
  titleCard,
} from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import {
  fetchActivityDoneDashboard,
  fetchActivityPendingDashboard,
  fetchActivityProgressDashboard,
  fetchAllActivity,
  getActivityOverview,
} from '../../redux/actions/activity';
import { fetchDashboardHarian } from '../../redux/actions/dashboardadmin';
import Layout from '../includes/Layout';
import Profile from '../Profile';

export default function Admin() {
  const USER = useSelector((state) => state.user);
  const DASHBOARD = useSelector((state) => state.dashboardadmin);
  const ACTIVITY = useSelector((state) => state.activity);
  const [didMount, setDidMount] = useState(false);
  const [profile, setprofile] = useState(false);
  const [dataRegional, setdataRegional] = useState([]);
  const dispatch = useDispatch();

  const getActivityRegional = async () => {
    setHeader();

    return iota
      .fetchActivityRegional({
        params: {
          date: convertDate('tanggalWaktuLengkap'),
        },
      })
      .then((res) => {
        setdataRegional(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getActivityRegional();

    dispatch(getActivityOverview());

    dispatch(
      fetchDashboardHarian(
        USER?.profile?.regional_id === '' ? null : USER?.profile?.regional_id,
      ),
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
    dispatch(
      fetchAllActivity({
        regional_id: USER?.profile?.regional_id,
      }),
    );
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <Layout>
      <Profile open={profile} handlerOpen={() => setprofile(false)} />

      {/* Section Header */}
      <div className="relative flex lg:hidden flex-row-reverse justify-between px-4 inset-x-0 mt-6">
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
          className="flex flex-col justify-center items-center bg-white shadow-lg shadow-zinc-200 p-1 rounded-lg">
          <MenuAlt2Icon className="h-8 text-zinc-600" />
        </button>
      </div>

      <div className="relative m-4">
        <h4 className="text-sm text-zinc-500 hidden">Welcome,</h4>
        <h1 className="text-2xl font-semibold text-zinc-800 capitalize hidden">
          {USER?.profile?.name?.toLowerCase() ?? 'Anonymous'}
        </h1>

        <h1 className="text-2xl font-bold text-zinc-800 capitalize">
          Overview
        </h1>
        <h4 className="text-sm text-zinc-500 mt-1">
          {convertDate('tanggalHari')}
        </h4>
      </div>

      {/* Section Dashboard For Mobile */}
      <div
        className={[
          'relative my-2',
          String(USER?.profile?.role_id) === '3' ? ' block sm:hidden' : 'block',
        ].join(' ')}>
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
                  {ACTIVITY?.dashboardActPending?.value > 1
                    ? 'acitivities'
                    : 'activity'}
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
            <SectionProgressCircle
              value={ACTIVITY?.dashboardActDone?.value}
              total={
                ACTIVITY?.dashboardActProgress?.value +
                ACTIVITY?.dashboardActDone?.value
              }
            />
          </div>

          <div className="relative grid grid-cols-2 p-3 rounded-xl bg-amber-500 mt-6">
            <div className="flex flex-col p-3">
              <p className="font-medium text-white">Total Activity</p>
              <h1 className="text-4xl text-white font-bold">
                {ACTIVITY?.isLoading
                  ? 0
                  : ACTIVITY?.dashboardActProgress?.value +
                    ACTIVITY?.dashboardActDone?.value}
              </h1>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-lg">
              <div className="flex flex-col space-y-1 items-start text-sm font-semibold ">
                <BadgeCheckIcon className="h-4 text-teal-600" />
                <p className="text-zinc-600 text-lg font-semibold">
                  {ACTIVITY?.dashboardActDone?.value ?? 0}
                </p>
                <p className="text-xs font-light text-zinc-500">Complete</p>
              </div>
              <div className="flex flex-col space-y-1 items-start text-sm font-semibold ">
                <TruckIcon className="h-4 text-amber-600" />
                <p className="text-zinc-600 text-lg font-semibold">
                  {ACTIVITY?.dashboardActProgress?.value ?? 0}
                </p>
                <p className="text-xs font-light text-zinc-500">To do</p>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-2 p-2 gap-1 bg-zinc-100 rounded-xl mt-6">
            <div className="flex flex-col rounded-xl justify-start p-4">
              <p className="font-medium text-zinc-500 text-sm">Attendance</p>
              <h1 className="font-semibold text-4xl text-zinc-800">
                {DASHBOARD?.reportKehadiran
                  ?.filter((item) => item.name === 'Hadir')
                  .map((item) => item.value) ?? ''}
              </h1>
              <p className="mt-2 px-2 py-1 text-blue-600 bg-blue-50 rounded-full text-xs w-fit">
                Presence
              </p>
            </div>
            <div className="flex flex-col bg-white shadow-lg rounded-lg justify-start p-4">
              <p className="font-medium text-zinc-500 text-sm">Attendance</p>
              <h1 className="font-semibold text-4xl text-zinc-800">
                {DASHBOARD?.reportKehadiran
                  ?.filter((item) => item.name === 'Belum Absen')
                  .map((item) => item.value) ?? ''}
              </h1>
              <p className="mt-2 px-2 py-1 text-red-600 bg-red-50 rounded-full text-xs w-fit">
                Not Absence
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Dashboard For Desktop */}

      <div
        className={[
          'relative mt-10 mb-4',
          String(USER?.profile?.role_id) === '3'
            ? ' hidden sm:block'
            : 'hidden',
        ].join(' ')}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Section Activity */}
          {ACTIVITY?.activitiesOverview?.length > 0 &&
            ACTIVITY?.activitiesOverview?.map((item) => (
              <div
                key={Math.random()}
                className={[
                  'relative flex justify-between items-center p-4 rounded-lg',
                  item.name === 'pending' &&
                    'bg-gradient-to-br from-red-500 to-pink-500 text-white',
                  item.name === 'todo' &&
                    'bg-gradient-to-br from-sky-500 to-blue-500 text-white',
                  item.name === 'progress' &&
                    'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
                  item.name === 'completed' &&
                    'bg-gradient-to-br from-green-400 to-teal-500 text-white',
                ].join(' ')}>
                <div className="relative">
                  <h1 className="mb-3 font-medium capitalize">{item.name}</h1>

                  <h1 className="text-2xl font-semibold mt-3">
                    {item.value}
                    <span className="text-sm ml-1">
                      {item.value > 1 ? 'activities' : 'activity'}
                    </span>
                  </h1>
                </div>
                <IconThumbnail
                  name={item.name}
                  addClas="h-14 w-14 p-2 rounded-lg"
                  backgroundClass={'bg-white'}
                />
              </div>
            ))}

          {/* Section Absensi */}
          <div className="relative col-span-3 bg-white rounded-lg px-4">
            <ChartBar title={'Attendance'} dataChart={DASHBOARD?.reportUnit} />
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h1 className="font-medium text-zinc-700">Summary Attendance</h1>
            <hr className="border border-zinc-100 mt-2 mx-4" />
            <dl className="mt-8 divide-y divide-zinc-100 text-sm lg:mt-0 lg:col-span-5">
              {DASHBOARD?.reportKeterangan?.map((item) => (
                <div
                  key={Math.random()}
                  className="py-2 mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={[
                        'h-4 w-4 rounded-lg',
                        ['Izin', 'Sakit', 'Cuti'].indexOf(item.name) > -1 &&
                          'bg-yellow-400',
                        ['SPPD', 'WFH', 'WFO'].indexOf(item.name) > -1 &&
                          'bg-sky-500',
                      ].join(' ')}></div>

                    <dt className="text-zinc-600">{titleCard(item.name)}</dt>
                  </div>
                  <dd className="font-semibold text-zinc-900">
                    {item.value}{' '}
                    <span className="font-light">
                      {item.value > 1 ? 'emps' : 'emp'}
                    </span>
                  </dd>
                </div>
              ))}
              {DASHBOARD?.reportKehadiran
                ?.filter((item) => item.name === 'Belum Absen')
                .map((val) => (
                  <div
                    key={Math.random()}
                    className="py-2 mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={[
                          'h-4 w-4 rounded-lg',
                          ['Izin', 'Sakit', 'Cuti'].indexOf(val.name) > -1 &&
                            'bg-yellow-400',
                          ['SPPD', 'WFH', 'WFO'].indexOf(val.name) > -1 &&
                            'bg-sky-500',
                          val.name === 'Belum Absen' && 'bg-red-500',
                        ].join(' ')}></div>

                      <dt className="text-zinc-600">{titleCard(val.name)}</dt>
                    </div>
                    <dd className="font-semibold text-zinc-900">
                      {val.value}{' '}
                      <span className="font-light">
                        {val.value > 1 ? 'emps' : 'emp'}
                      </span>
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Section Table Summary Activity */}

      <div
        className={[
          'relative bg-white rounded-lg p-4 mt-8',
          String(USER?.profile?.role_id) === '3'
            ? ' hidden sm:block'
            : 'hidden',
        ].join(' ')}>
        <h1 className="font-semibold text-zinc-800">Summary Activtiy</h1>
        <table className="w-full rounded-xl mt-4">
          <thead className="border-b-2 text-zinc-500 uppercase text-sm border-zinc-50 bg-zinc-100 rounded-lg">
            <tr className="border-y border-white rounded-lg">
              <th rowSpan={2} className="font-medium">
                No
              </th>
              <th rowSpan={2} className="font-medium">
                T.Regional
              </th>
              <th rowSpan={2} className="font-medium border-r border-white">
                Total Emp.
              </th>
              <th colSpan={4} className="p-1 font-medium">
                Activity
              </th>
            </tr>
            <tr>
              <th className="py-1 font-medium">Pending</th>
              <th className="py-1 font-medium">To do</th>
              <th className="py-1 font-medium">Progress</th>
              <th className="py-1 font-medium">Completed</th>
            </tr>
          </thead>
          <tbody>
            {dataRegional?.map((item, index) => (
              <tr
                key={Math.random()}
                className={`border-b hover:bg-slate-100 transition-all duration-300 ease-in-out`}>
                <td className="text-center py-4 text-zinc-500">{index + 1}</td>
                <td className="pl-4 font-medium text-zinc-700 text-sm">
                  {item.name}
                </td>
                <td className="text-center font-light text-zinc-500">
                  {item.total_karyawan}
                </td>
                <td className="text-center font-semibold text-blue-500">
                  {item.pending}
                </td>
                <td className="text-center font-semibold text-blue-500">
                  {item.todo}
                </td>
                <td className="text-center font-semibold text-blue-500">
                  {item.progress}
                </td>
                <td className="text-center font-semibold text-blue-500">
                  {item.completed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
