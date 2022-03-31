import { DownloadIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { SectionFilterMonthYear } from '../../components/molecules';
import { imageApiAvatarUser } from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';

export default function Users() {
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

  return (
    <div className="relative my-8 mx-4">
      <div className="lg:container lg:mx-auto flex justify-center items-center relative -mt-6 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <p className="text-sm text-zinc-500 font-medium">Result : 20</p>
        <div className="flex space-x-1 justify-center items-center text-sm font-medium text-zinc-500">
          <DownloadIcon className="h-4" />
          <p>Download</p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-y-5 mt-4">
        {Array.from({ length: 20 }).map((item) => (
          <div
            key={Math.random()}
            className="flex flex-col bg-white shadow-lg shadow-zinc-200/50 rounded-lg p-3">
            <div className="flex space-x-3">
              <img
                src={imageApiAvatarUser('Abdul Muchtar Astria')}
                className="h-12 w-12 rounded-md"
                alt=""
              />
              <div className="fle flex-col">
                <p className="text-sm font-semibold text-zinc-800">
                  Abdul Muchtar Astria
                </p>
                <p className="text-sm font-medium text-zinc-500">
                  IT & Management
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 bg-zinc-100 px-4 py-2 rounded-md mt-4">
              <div className="flex flex-col space-y-1">
                <h1 className="text-xs font-medium text-zinc-400">Hadir</h1>
                <span className="font-semibold text-zinc-800">2</span>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-xs font-medium text-zinc-400">Telat</h1>
                <span className="font-semibold text-zinc-800">2</span>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-xs font-medium text-zinc-400">Absent</h1>
                <span className="font-semibold text-zinc-800">2</span>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-xs font-medium text-zinc-400">
                  Keterangan
                </h1>
                <span className="font-semibold text-zinc-800">2</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
