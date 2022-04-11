import { UserGroupIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/atoms';
import { SectionSummary } from '../../components/molecules';
import { convertDate } from '../../helpers/convertDate';
import { fetchDashboardHarian } from '../../redux/actions/dashboardadmin';

export default function Harian() {
  const dispatch = useDispatch();
  const DASHBOARD = useSelector((state) => state.dashboardadmin);

  const regional = [
    { id: 2, name: 'TR1 SUMATERA', value: 70 },
    { id: 3, name: 'TR2 JABODETABEK', value: 60 },
    { id: 4, name: 'TR3 JABAR', value: 60 },
    { id: 5, name: 'TR4 JATENG & DIY', value: 60 },
    { id: 6, name: 'TR5 JATIM & BALNUS', value: 50 },
    { id: 7, name: 'TR6 KALIMANTAN', value: 40 },
    { id: 8, name: 'TR7 KTI', value: 40 },
  ];

  useEffect(() => {
    dispatch(fetchDashboardHarian(DASHBOARD?.regionalSelected?.id));
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
                    {item.name}
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
          {DASHBOARD?.reportKerja?.length > 0 &&
            DASHBOARD?.reportKerja?.map((item) => (
              <SectionSummary
                key={Math.random()}
                type="karyawan"
                data={item}
                handlerClick={() => null}
                isEvent={true}
              />
            ))}
          {DASHBOARD?.reportKeterangan?.length > 0 &&
            DASHBOARD?.reportKeterangan?.map((item) => (
              <SectionSummary
                key={Math.random()}
                type="karyawan"
                data={item}
                handlerClick={() => null}
                isEvent={true}
              />
            ))}
          {DASHBOARD?.reportKehadiran?.length > 0 &&
            DASHBOARD?.reportKehadiran
              ?.filter(
                (item) =>
                  item.name === 'Tidak Checkout' || item.name === 'Tidak Absen',
              )
              .map((item) => (
                <SectionSummary
                  key={Math.random()}
                  type="karyawan"
                  data={item}
                  handlerClick={() => null}
                  isEvent={true}
                />
              ))}
        </div>
      )}

      {/* ======================= */}
      {/* Section Performansi Regional */}
      <div className="relative my-8 hidden">
        <h1 className="text-zinc-800 font-semibold">Performansi</h1>

        <div className="grid grid-cols-1 gap-y-4 mt-3">
          {regional.map((item) => (
            <div
              key={Math.random()}
              className="flex justify-between gap-2 bg-white rounded-lg p-4 items-center shadow-lg shadow-zinc-100">
              {/* <h1 className="text-xl text-gray-400 font-semibold">{index + 1}</h1> */}
              <div className="flex flex-col gap-1 md:gap-0 w-4/5 px-2 lg:-ml-4">
                <h1 className="font-semibold text-sm text-zinc-800">
                  {item.name}
                </h1>
                <h2 className="text-zinc-600 text-xs mt-1">
                  {item.value} % of {200} Karyawan
                </h2>
              </div>
              <div className="flex justify-center items-center gap-1 text-zinc-800">
                <UserGroupIcon className="h-5 w-5" />
                <span>{20}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
