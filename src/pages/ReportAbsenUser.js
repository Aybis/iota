import { DownloadIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import {
  SectionFilterMonthYear,
  SectionHeaderPage,
} from '../components/molecules';
import { convertDate } from '../helpers/convertDate';
import Layout from '../pages/includes/Layout';

export default function ReportAbsenUser() {
  // const [showModal, setshowModal] = useState(false);
  // const [imageSource, setimageSource] = useState('');
  const [temporary, setTemporary] = useState({
    month: convertDate('bulan'),
    year: convertDate('tahun'),
  });

  // const handlerClickImage = (event) => {
  //   setshowModal(true);
  //   setimageSource(event.target.src);
  // };

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      setTemporary({
        month: event.target.value,
        year: temporary.year,
      });
    }

    if (event.target.name === 'year') {
      setTemporary({
        month: temporary.month,
        year: event.target.value,
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <SectionHeaderPage title={'Laporan Personal Absensi'} />

      <div className="relative mt-8 max-w-7xl container mx-auto">
        <h1 className="px-4 font-semibold text-zinc-900">Absensi Minggu Ini</h1>
        <div className="flex overflow-x-auto  lg:grid grid-cols-5 gap-4  p-4">
          <p className="text-center flex w-full items-center justify-center text-zinc-500 font-semibold mt-6">
            Belum ada absen minggu ini!
          </p>
        </div>
      </div>

      <div className="lg:container lg:mx-auto flex justify-center items-center relative mt-4 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      <div className="container mx-auto max-w-7xl flex flex-col gap-3 px-4 my-8">
        <div className="relative flex justify-between items-center mb-4">
          <span className="text-sm lg:text-base font-medium text-zinc-600">
            Result : 30
          </span>
          <p className="flex gap-1 cursor-pointer hover:border-zinc-600 border-b-2 border-transparent items-center justify-center text-sm lg:text-base font-medium text-zinc-600">
            <DownloadIcon className="h-4" />
            Download
          </p>
        </div>
        <div className="flex gap-6 flex-col">
          <p className="text-center text-zinc-500 font-semibold mt-6">
            Belum ada absen bulan ini!
          </p>
        </div>
      </div>
      {/* <Modals position="center" open={showModal} handlerClose={setshowModal}>
        <img
          src={imageSource}
          alt={imageSource}
          className="rounded-lg object-cover lg:h-96"
        />
      </Modals> */}
    </Layout>
  );
}
