import {
  BadgeCheckIcon,
  ClockIcon,
  MenuAlt2Icon,
  TruckIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionProgressCircle } from '../../components/molecules';
import { imageApiAvatarUser } from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import {
  fetchActivityDoneDashboard,
  fetchActivityPendingDashboard,
  fetchActivityProgressDashboard,
} from '../../redux/actions/activity';
import { fetchDashboardHarian } from '../../redux/actions/dashboardadmin';
import Layout from '../includes/Layout';
import Profile from '../Profile';

export default function Admin() {
  const USER = useSelector((state) => state.user);
  const DASHBOARD = useSelector((state) => state.dashboardadmin);
  const ACTIVITY = useSelector((state) => state.activity);
  const [profile, setprofile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
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
    </Layout>
  );
}
