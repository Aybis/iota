import { ArrowNarrowLeftIcon, CogIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonCustom } from '../../../components/atoms';
import { SectionHeaderPage } from '../../../components/molecules';
import { convertDate } from '../../../helpers/convertDate';
import { fetchDataHoliday } from '../../../redux/actions/libur';
import Layout from '../../includes/Layout';

export default function Index() {
  const HOLIDAY = useSelector((state) => state.holiday);
  const USER = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataHoliday(1, convertDate('tahun')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout showBottomBar={false} isLeadOnly={true}>
      <SectionHeaderPage title={'Manage Day Off'} />
      {/* Section Header */}
      <div className="relative my-4 px-4 lg:px-0 flex items-center justify-between">
        <div
          className="relative cursor-pointer hover:scale-110 rounded-lg transition-all duration-300 ease-out text-zinc-600 flex space-x-1 items-center"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
          <span className="text-xs text-zinc-500 font-medium">Back</span>
        </div>
      </div>

      {String(USER?.profile?.role_id) === '3' && (
        <div className="relative px-4 flex mx-auto container max-w-7xl justify-end mb-8">
          <ButtonCustom
            isAnimated={true}
            handlerClick={() => navigate('/management/libur/data')}
            moreClass={'shadow-lg shadow-blue-500/50 gap-1'}>
            <CogIcon className="h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Manage Day Off
            </span>
          </ButtonCustom>
        </div>
      )}

      {/* Section Content */}
      <div className="relative mx-auto container px-4 pt-4 lg:px-0 max-w-7xl mt-2">
        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-300 ease-in-out">
          {HOLIDAY?.loading ? (
            Array.from({ length: 8 }).map((item) => (
              <div key={Math.random()} className={['relative'].join(' ')}>
                <div
                  className={[
                    'relative bg-white rounded-lg ',
                    'shadow-lg shadow-zinc-200/40',
                  ].join(' ')}>
                  <div className="relative bg-[#D71D1D] rounded-t-lg px-4 py-2 flex justify-center items-center text-lg text-white font-bold">
                    <div className="w-full h-4 bg-zinc-200 animate-pulse"></div>
                  </div>
                  <div className="p-4 flex flex-col justify-center items-center">
                    <div className="w-16 h-24 bg-zinc-100 rounded-md animate-pulse"></div>

                    <div className="w-24 h-8 mt-2 rounded-md bg-zinc-100 animate-pulse"></div>
                  </div>
                </div>

                <div className="relative p-3 rounded-b-lg">
                  <div className="w-full h-4 bg-zinc-200 animate-pulse"></div>
                </div>
              </div>
            ))
          ) : HOLIDAY?.listData?.length > 0 ? (
            HOLIDAY?.listData?.map((item, index) => (
              <div
                key={index}
                className={[
                  'relative',
                  convertDate('parseTime', item.tanggal) <
                  convertDate('parseTime')
                    ? 'opacity-50 cursor-not-allowed'
                    : 'opacity-100',
                ].join(' ')}>
                <div
                  className={[
                    'relative bg-white rounded-lg ',
                    convertDate('parseTime', item.tanggal) <
                    convertDate('parseTime')
                      ? ''
                      : 'shadow-lg shadow-zinc-200/40',
                  ].join(' ')}>
                  <div className="relative bg-[#D71D1D] rounded-t-lg px-4 py-2 flex justify-center items-center text-lg text-white font-bold">
                    <p>{convertDate('namaBulan', item.tanggal)}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-5xl text-center font-semibold text-zinc-800">
                      {convertDate('tanggal', item.tanggal)}
                    </p>
                    <p className="text-center font-medium text-zinc-500 mt-2">
                      {convertDate('namaHari', item.tanggal)}
                    </p>
                  </div>
                </div>

                <div className="relative p-3 rounded-b-lg">
                  <p className="text-center text-sm text-zinc-600">
                    {item.nama}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="relative flex justify-center items-center p-4 col-span-5">
              <p className="text-sm font-medium text-zinc-700">
                Tidak ada data
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
