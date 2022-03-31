import { UserGroupIcon } from '@heroicons/react/solid';
import React from 'react';
import { SectionSummary } from '../../components/molecules';
import { convertDate } from '../../helpers/convertDate';

export default function Harian() {
  const dataKehadiran = [
    {
      title: 'Kehadiran',
      value: 100,
      name: 'hadir',
      desc: 'Karyawan',
    },
    {
      title: 'Terlambat',
      value: 10,
      name: 'terlambat',
      desc: 'Karyawan',
    },
    {
      title: 'Keterangan',
      value: 10,
      name: 'keterangan',
      desc: 'Karyawan',
    },
    {
      title: 'Belum Absen',
      value: 40,
      name: 'belum absen',
      desc: 'Karyawan',
    },
    {
      title: 'Tidak Checkout',
      value: 20,
      name: 'tidak checkout',
      desc: 'Karyawan',
    },
    {
      title: 'Tidak Absen',
      value: 30,
      name: 'tidak absen',
      desc: 'Karyawan',
    },
  ];

  const dataSummary = [
    {
      name: 'WFH',
      value: 80,
    },
    {
      name: 'WFO',
      value: 20,
    },
    {
      name: 'sakit',
      value: 5,
    },
    {
      name: 'izin',
      value: 0,
    },
    {
      name: 'sppd',
      value: 2,
    },
    {
      name: 'cuti',
      value: 3,
    },
    {
      name: 'tidak checkout',
      value: 3,
    },
    {
      name: 'tidak absen',
      value: 3,
    },
  ];

  const regional = [
    { id: 2, name: 'TREG 1 SUMATERA', value: 70 },
    { id: 3, name: 'TREG 2 JABODETABEK', value: 60 },
    { id: 4, name: 'TREG 3 JAWA BARAT', value: 60 },
    { id: 5, name: 'TREG 4 JAWA TENGAH', value: 60 },
    { id: 6, name: 'TREG 5 JAWA TIMUR', value: 50 },
    { id: 7, name: 'TREG 6 KALIMANTAN', value: 40 },
    { id: 8, name: 'TREG 7 KTI', value: 40 },
    { id: 9, name: 'TREG 8 BALI NUSRA', value: 40 },
  ];

  return (
    <div className="relative my-8 mx-4">
      <h1 className="text-sm font-semibold text-zinc-700">
        {convertDate('tanggalHari')}
      </h1>

      <div className="relative mt-4 mb-6 lg:px-0 container mx-auto max-w-7xl">
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

      <h1 className="text-zinc-800 font-semibold">Summary</h1>
      <div className="relative grid grid-cols-2 gap-4 mt-2">
        {dataSummary.map((item) => (
          <SectionSummary key={Math.random()} data={item} type="karyawan" />
        ))}
      </div>

      <div className="relative my-8">
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
