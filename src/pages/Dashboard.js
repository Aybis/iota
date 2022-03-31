import React, { useState } from 'react';
import {
  SectionFilterMonthYear,
  SectionHeaderPage,
  SectionSummary,
} from '../components/molecules';
import { getImageFromAssets } from '../helpers/assetHelpers';
import { convertDate } from '../helpers/convertDate';
import Layout from './includes/Layout';

export default function Dashboard() {
  const [temporary, setTemporary] = useState({
    month: convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const dataSummary = [
    {
      name: 'WFH',
      value: 9,
    },
    {
      name: 'WFO',
      value: 9,
    },
    {
      name: 'sakit',
      value: 0,
    },
    {
      name: 'izin',
      value: 2,
    },
    {
      name: 'sppd',
      value: 4,
    },
    {
      name: 'cuti',
      value: 0,
    },
  ];

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

  return (
    <Layout>
      <SectionHeaderPage title={'Dashboard Absensi Personal'} />
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
              src={getImageFromAssets('/assets/img.jpg')}
              alt=""
              className="h-16 w-16 object-cover rounded-md"
            />
            <div className="relative">
              <h1 className="text-zinc-900 font-semibold text-base mt-3 capitalize">
                Abdul Muchtar Astria
              </h1>
              <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
                CEO of KerjaKuda
              </h4>
            </div>
          </div>
          <div className="relative pl-4">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Kehadiran
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">{14}</h1>
          </div>
          <div className="relative pl-4 border-l border-zinc-100 ">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Keterangan
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">0</h1>
          </div>
          <div className="relative pl-4 border-l border-zinc-100 ">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Terlambat
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">2</h1>
          </div>
          <div className="relative pl-4 border-l border-zinc-100 ">
            <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
              Alfa
            </h4>
            <h1 className="text-zinc-900 font-bold text-xl mt-3">0</h1>
          </div>
        </div>
      </div>

      <div className="relative my-8 px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:px-0 container mx-auto max-w-7xl">
        {dataSummary.map((item, index) => (
          <SectionSummary key={index + 1} type="day" data={item} />
        ))}
      </div>
    </Layout>
  );
}
