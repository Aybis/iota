import { BadgeCheckIcon, ClockIcon, TruckIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  SectionProgressCircle,
  SkeletonDashboardSummary,
} from '../../components/molecules';
import { convertDate } from '../../helpers/convertDate';
import {
  fetchActivityDoneDashboard,
  fetchActivityPendingDashboard,
  fetchActivityProgressDashboard,
  setDataStatus,
} from '../../redux/actions/activity';

export default function Daily() {
  const USER = useSelector((state) => state.user);
  const ACTIVITY = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerClickListDetail = (item) => {
    dispatch(
      setDataStatus({
        type: item.name,
        name: item.title,
        value: item.value,
        regional_id:
          USER?.profile?.regional_id === ''
            ? ACTIVITY?.regionalSelectedAct?.id
            : USER?.profile?.regional_id,
        date: convertDate('tanggalFormat'),
      }),
    );
    navigate('/activities/status');
  };

  useEffect(() => {
    dispatch(
      fetchActivityProgressDashboard({
        regional_id:
          USER?.profile?.regional_id === ''
            ? ACTIVITY?.regionalSelectedAct?.id
            : USER?.profile?.regional_id,
        date: convertDate('tanggalFormat'),
      }),
    );

    dispatch(
      fetchActivityDoneDashboard({
        regional_id:
          USER?.profile?.regional_id === ''
            ? ACTIVITY?.regionalSelectedAct?.id
            : USER?.profile?.regional_id,
        date: convertDate('tanggalFormat'),
      }),
    );

    dispatch(
      fetchActivityPendingDashboard({
        regional_id:
          USER?.profile?.regional_id === ''
            ? ACTIVITY?.regionalSelectedAct?.id
            : USER?.profile?.regional_id,
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="relative my-8">
      {ACTIVITY?.isLoading ? (
        <SkeletonDashboardSummary />
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-6 mx-4">
          <div className="flex justify-between items-center px-8 col-span-2 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-400 p-3 rounded-lg">
            <div>
              <h1 className="text-xl font-bold text-white">
                Task's progress summary
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

          <div
            onClick={() =>
              handlerClickListDetail(ACTIVITY?.dashboardActProgress)
            }
            className="bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg px-4 py-3 shadow-lg shadow-amber-500/50 flex flex-col justify-between space-y-4">
            <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
              <TruckIcon className="text-amber-500 h-7" />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-zinc-50 text-sm font-medium">To do</p>
              <p className="text-2xl font-bold text-white">
                {ACTIVITY?.dashboardActProgress?.value}
              </p>
            </div>
          </div>
          <div
            onClick={() => handlerClickListDetail(ACTIVITY?.dashboardActDone)}
            className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-lg px-4 py-3 shadow-lg shadow-teal-500/50 flex flex-col justify-between">
            <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
              <BadgeCheckIcon className="text-teal-500 h-7" />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-zinc-50 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-white">
                {ACTIVITY?.dashboardActDone?.value}
              </p>
            </div>
          </div>
          <div
            onClick={() =>
              handlerClickListDetail(ACTIVITY?.dashboardActPending)
            }
            className=" flex space-x-4 items-center p-4 col-span-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
            <div>
              <ClockIcon className="h-12 text-white" />
            </div>
            <div>
              <h1 className=" font-medium text-zinc-100">Pending Activity</h1>
              <p className="mt-1 text-2xl font-bold text-white">
                {ACTIVITY?.dashboardActPending?.value}{' '}
                <small className="text-sm font-normal text-zinc-100">
                  {ACTIVITY?.dashboardActPending?.value > 1
                    ? 'activities'
                    : 'activity'}
                </small>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
