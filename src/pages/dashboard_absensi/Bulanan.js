import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/atoms';
import {
  ChartDoughnut,
  ChartGauge,
  SectionFilterMonthYear,
  SectionSummary,
} from '../../components/molecules';
import { titleCard } from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import {
  fetchDashboardBulanan,
  setBulan,
  setTahun,
} from '../../redux/actions/dashboardadmin';

export default function Bulanan() {
  const DASHBOARD = useSelector((state) => state.dashboardadmin);
  const USER = useSelector((state) => state.user);
  const [temporary, setTemporary] = useState({
    month:
      convertDate('bulan') < 10
        ? `0${convertDate('bulan')}`
        : convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const dispatch = useDispatch();

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      setTemporary({
        month: event.target.value,
        year: temporary.year,
      });

      dispatch(setBulan(event.target.value));

      dispatch(
        fetchDashboardBulanan({
          month: event.target.value,
          year: temporary.year,
          regional_id:
            USER?.profile?.regional_id === ''
              ? DASHBOARD?.regionalSelected?.id
              : USER?.profile?.regional_id,
        }),
      );
    }

    if (event.target.name === 'year') {
      dispatch(setTahun(event.target.value));

      setTemporary({
        month: temporary.month,
        year: event.target.value,
      });
      dispatch(
        fetchDashboardBulanan({
          month: temporary.month,
          year: event.target.value,
          regional_id:
            USER?.profile?.regional_id === ''
              ? DASHBOARD?.regionalSelected?.id
              : USER?.profile?.regional_id,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(
      fetchDashboardBulanan({
        month: temporary.month,
        year: temporary.year,
        regional_id:
          USER?.profile?.regional_id === ''
            ? DASHBOARD?.regionalSelected?.id
            : USER?.profile?.regional_id,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative my-8 mx-4">
      <div className="lg:container lg:mx-auto flex justify-center items-center relative -mt-6 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      {DASHBOARD?.isLoading ? (
        <div className="flex justify-center items-center p-4">
          <Loading height={6} width={6} />
        </div>
      ) : (
        <>
          <div className="relative my-8 lg:px-0 container mx-auto max-w-7xl">
            <div className="grid grid-cols-4 gap-2 gap-y-3 divide-x divide-zinc-100 bg-white rounded-md py-4">
              {DASHBOARD?.reportKehadiranBulanan?.map((item) => (
                <div key={Math.random()} className="relative px-4">
                  <h4 className="text-zinc-500 font-normal text-xs lg:text-sm capitalize">
                    {titleCard(item.name)}
                  </h4>
                  <h1 className="text-zinc-900 font-bold text-xl mt-3">
                    {item.value}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          <div className="relative my-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:px-0 container mx-auto max-w-7xl">
            {DASHBOARD?.reportKeteranganBulanan?.length > 0 &&
              DASHBOARD?.reportKeteranganBulanan?.map((item) => (
                <SectionSummary
                  key={Math.random()}
                  type="employee"
                  data={item}
                  handlerClick={() => null}
                  isEvent={false}
                />
              ))}
          </div>

          {/* Chart  */}
          <div className="relative my-8 lg:px-0 container mx-auto max-w-7xl">
            <h1 className="text-zinc-900 font-semibold lg:text-lg">
              Performance
            </h1>

            <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
              <div className="bg-white rounded-md p-4">
                {DASHBOARD?.isLoading ? (
                  <div className="flex justify-center items-center">
                    <Loading height={6} width={6} color={'text-blue-500'} />
                  </div>
                ) : (
                  DASHBOARD?.reportKeteranganBulanan && (
                    <ChartDoughnut
                      dataChart={DASHBOARD?.reportKeteranganBulanan}
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
                  DASHBOARD?.reportKehadiranBulanan && (
                    <ChartGauge
                      dataChart={DASHBOARD?.reportKehadiranBulanan?.filter(
                        (item) =>
                          item.name === 'kehadiran' ||
                          item.name === 'Tidak Absen',
                      )}
                      title={'Attendance'}
                      type="emp"
                      isNegative={true}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
