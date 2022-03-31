import React, { useState } from 'react';
import {
  SectionFilterMonthYear,
  SectionSummary,
} from '../../components/molecules';
import { convertDate } from '../../helpers/convertDate';

export default function Bulanan() {
  const [temporary, setTemporary] = useState({
    month: convertDate('bulan'),
    year: convertDate('tahun'),
  });

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

  const dataKehadiran = [
    {
      title: 'Kehadiran',
      value: 1000,
      name: 'hadir',
      desc: 'Karyawan',
    },
    {
      title: 'Terlambat',
      value: 423,
      name: 'terlambat',
      desc: 'Karyawan',
    },
    {
      title: 'Keterangan',
      value: 300,
      name: 'keterangan',
      desc: 'Karyawan',
    },
    {
      title: 'Tidak Absen',
      value: 123,
      name: 'keterangan',
      desc: 'Karyawan',
    },
  ];

  const dataSummary = [
    {
      name: 'WFH',
      value: 800,
    },
    {
      name: 'WFO',
      value: 200,
    },
    {
      name: 'sakit',
      value: 30,
    },
    {
      name: 'izin',
      value: 20,
    },
    {
      name: 'sppd',
      value: 150,
    },
    {
      name: 'cuti',
      value: 100,
    },
  ];

  return (
    <div className="relative my-8 mx-4">
      <div className="lg:container lg:mx-auto flex justify-center items-center relative -mt-6 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      <div className="relative my-8 lg:px-0 container mx-auto max-w-7xl">
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 gap-y-3 divide-x divide-zinc-100 bg-white rounded-md p-2">
          {dataKehadiran
            .filter(
              (item) =>
                item.name !== 'tidak absen' && item.name !== 'tidak checkout',
            )
            .map((item) => (
              <div key={Math.random()} className="relative pl-2">
                <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
                  {item.title}
                </h4>
                <h1 className="text-zinc-900 font-bold text-xl mt-3">
                  {item.value}
                </h1>
              </div>
            ))}
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-4">
        {dataSummary.map((item) => (
          <SectionSummary key={Math.random()} data={item} type="karyawan" />
        ))}
      </div>
    </div>
  );
}
