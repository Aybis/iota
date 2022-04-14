import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/atoms';
import {
  ChartDoughnut,
  ChartGauge,
  SectionFilterMonthYear,
  SectionHeaderPage,
  SectionSummary,
} from '../components/molecules';
import { imageApi } from '../helpers/assetHelpers';
import { convertDate } from '../helpers/convertDate';
import { fetchDataSummary } from '../redux/actions/dashboarduser';
import Layout from './includes/Layout';

export default function DashboardUser() {
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.user);
  const SUMMARY = useSelector((state) => state.dashboarduser);
  const navigate = useNavigate();

  const [temporary, setTemporary] = useState({
    month:
      convertDate('bulan') < 10
        ? `0${convertDate('bulan')}`
        : convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      setTemporary({
        month: event.target.value,
        year: temporary.year,
      });
      dispatch(
        fetchDataSummary({
          user_id: USER?.profile.id,
          month: event.target.value,
          year: temporary.year,
        }),
      );
    }

    if (event.target.name === 'year') {
      setTemporary({
        month: temporary.month,
        year: event.target.value,
      });
      dispatch(
        fetchDataSummary({
          user_id: USER?.profile.id,
          month: temporary.month,
          year: event.target.value,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(
      fetchDataSummary({
        user_id: USER?.profile.id,
        month: convertDate('bulan'),
        year: convertDate('tahun'),
      }),
    );

    if (USER?.profile?.role_id !== '1') {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <SectionHeaderPage title={'Personal Attendance Dashboard'} />
      <div className="relative mx-auto container px-4 pt-4 lg:pt-8 lg:px-0 max-w-7xl">
        <h1 className="text-zinc-900 font-semibold lg:text-lg">Summary</h1>
      </div>

      <div className="lg:container lg:mx-auto flex justify-center items-center relative -mt-2 p-4 lg:p-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      <div className="relative my-8 px-4 lg:px-0 container mx-auto max-w-7xl">
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 lg:divide-x divide-zinc-100 bg-white rounded-md p-2">
          <div className="lg:flex justify-start hidden items-start gap-3 pl-4 col-span-2">
            <img
              src={USER?.profile?.avatar ?? imageApi(USER?.profile?.name)}
              alt=""
              className="h-16 w-16 object-cover rounded-md"
            />
            <div className="relative">
              <h1 className="text-zinc-900 font-semibold text-base mt-3 capitalize">
                {USER?.profile?.name?.toLowerCase()}
              </h1>
              <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
                {USER?.profile?.posisi}
              </h4>
            </div>
          </div>
          <div className="relative pl-4">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Presence
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">
              {SUMMARY?.kehadiran}
            </h1>
          </div>
          <div className="relative pl-4 border-l border-zinc-100 ">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Explanation
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">
              {SUMMARY?.keterangan}
            </h1>
          </div>
          <div className="relative pl-4 border-l border-zinc-100 ">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Late
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">
              {SUMMARY?.terlambat}
            </h1>
          </div>
          <div className="relative pl-4 border-l border-zinc-100 ">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Absent
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">
              {SUMMARY?.absent}
            </h1>
          </div>
        </div>
      </div>

      <div className="relative my-8 px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:px-0 container mx-auto max-w-7xl">
        {SUMMARY?.isLoading ? (
          <div className="flex justify-center items-center col-span-2 lg:col-span-4">
            <Loading height={6} width={6} color={'text-blue-500'} />
          </div>
        ) : (
          SUMMARY?.summary?.kehadiran?.map((item, index) => (
            <SectionSummary key={index + 1} type="day" data={item} />
          ))
        )}
      </div>

      {/* Chart  */}
      <div className="relative my-8 px-4 lg:px-0 container mx-auto max-w-7xl">
        <h1 className="text-zinc-900 font-semibold lg:text-lg">Performance</h1>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
          <div className="bg-white rounded-md p-4">
            {SUMMARY?.isLoading ? (
              <div className="flex justify-center items-center">
                <Loading color={'text-blue-500'} />
              </div>
            ) : (
              SUMMARY?.kehadiran && (
                <ChartDoughnut
                  dataChart={SUMMARY?.summary?.kehadiran}
                  type={'day'}
                  title={'Attendance Explanation'}
                />
              )
            )}
          </div>
          <div className="bg-white rounded-md p-4">
            {SUMMARY?.isLoading ? (
              <div className="flex justify-center items-center">
                <Loading color={'text-blue-500'} />
              </div>
            ) : (
              <ChartGauge
                dataChart={[
                  {
                    name: 'Presence',
                    value: SUMMARY?.kehadiran ?? 0,
                  },
                  {
                    name: 'Absent',
                    value: SUMMARY?.absent ?? 0,
                  },
                ]}
                title={'Attendance'}
                type="day"
                isNegative={true}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
