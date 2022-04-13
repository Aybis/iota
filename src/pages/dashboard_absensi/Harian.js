import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/atoms';
import {
  ChartDoughnut,
  ChartGauge,
  SectionSummary,
} from '../../components/molecules';
import { convertDate } from '../../helpers/convertDate';
import { fetchDashboardHarian } from '../../redux/actions/dashboardadmin';

export default function Harian() {
  const dispatch = useDispatch();
  const DASHBOARD = useSelector((state) => state.dashboardadmin);
  const USER = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      fetchDashboardHarian(
        USER?.profile?.regional_id === ''
          ? DASHBOARD?.regionalSelected?.id
          : USER?.profile?.regional_id,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="relative my-8 mx-4">
      <h1 className="text-sm font-semibold text-zinc-700">
        {convertDate('tanggalHari')}
      </h1>
      <div className="relative mt-4 mb-6 lg:px-0 container mx-auto max-w-7xl">
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 gap-y-3 divide-x divide-zinc-100 bg-white rounded-md p-2">
          {DASHBOARD?.reportKehadiran?.length > 0 &&
            DASHBOARD?.reportKehadiran
              ?.filter(
                (item) =>
                  item.name !== 'Tidak Checkout' && item.name !== 'Tidak Absen',
              )
              .map((item) => (
                <div key={Math.random()} className="relative pl-2">
                  <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
                    {item.name === 'Hadir'
                      ? 'Presence'
                      : item.name === 'Terlambat'
                      ? 'Late'
                      : item.name === 'Keterangan'
                      ? 'Explanation'
                      : item.name === 'Belum Absen'
                      ? 'Not Absent'
                      : ''}
                  </h4>
                  <h1 className="text-zinc-900 font-bold text-xl mt-3">
                    {item.value}
                  </h1>
                </div>
              ))}
        </div>
      </div>

      {/* ================ */}
      <h1 className="text-zinc-800 font-semibold">Summary</h1>

      {DASHBOARD?.isLoading ? (
        <div className="flex justify-center items-center col-span-2 lg:col-span-4">
          <Loading height={6} width={6} color={'text-blue-500'} />
        </div>
      ) : (
        <div className="relative my-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:px-0 container mx-auto max-w-7xl">
          {DASHBOARD?.reportKeterangan?.length > 0 &&
            DASHBOARD?.reportKeterangan?.map((item) => (
              <SectionSummary
                key={Math.random()}
                type="employee"
                data={item}
                handlerClick={() => null}
                isEvent={true}
              />
            ))}
        </div>
      )}

      {/* Chart  */}
      <div className="relative my-8 lg:px-0 container mx-auto max-w-7xl">
        <h1 className="text-zinc-900 font-semibold lg:text-lg">Performance</h1>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
          <div className="bg-white rounded-md p-4">
            {DASHBOARD?.isLoading ? (
              <div className="flex justify-center items-center">
                <Loading height={6} width={6} color={'text-blue-500'} />
              </div>
            ) : (
              DASHBOARD?.reportKeterangan && (
                <ChartDoughnut
                  dataChart={DASHBOARD?.reportKeterangan}
                  type={'emp'}
                  title={'Attendance Explanation'}
                />
              )
            )}
          </div>
          <div className="bg-white rounded-md p-4">
            {DASHBOARD?.isLoading ? (
              <div className="flex justify-center items-center">
                <Loading height={6} width={6} color={'text-blue-500'} />
              </div>
            ) : (
              <ChartGauge
                dataChart={DASHBOARD?.reportKehadiran?.filter(
                  (item) =>
                    item.name === 'Hadir' || item.name === 'Belum Absen',
                )}
                title={'Attendance'}
                type="emp"
                isNegative={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
