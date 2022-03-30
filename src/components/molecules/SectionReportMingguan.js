import {
  ClipboardListIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import React from 'react';
import { convertDate } from '../../helpers/convertDate';

export default function SectionReportMingguan({ item }) {
  return (
    <div className="flex flex-none w-40 lg:w-auto flex-col gap-3 bg-white p-4 rounded-lg shadow-lg shadow-zinc-200/50">
      <span
        className={[
          'p-2 relative lg:h-12 lg:w-12 h-10 w-10 rounded-lg flex justify-center items-center shadow-md',
          !item.kehadiran && 'bg-yellow-500 shadow-yellow-500/50',
          item.kehadiran === 'WFO'
            ? 'bg-blue-500 shadow-blue-500/50'
            : 'bg-green-500 shadow-green-500/50',
        ].join(' ')}>
        {item.kehadiran ? (
          item.kehadiran === 'WFH' ? (
            <HomeIcon className="h-6 w-6 text-white" />
          ) : (
            <OfficeBuildingIcon className="h-6 w-6 text-white" />
          )
        ) : (
          <ClipboardListIcon className="h-6 w-6 text-white" />
        )}
      </span>
      <p className="font-semibold text-zinc-900 text-sm lg:text-lg capitalize">
        {item.kehadiran
          ? item.kehadiran === 'WFH'
            ? 'At Home'
            : 'At Office'
          : item.kondisi}
      </p>
      <p className="font-medium text-sm lg:text-base text-zinc-500">
        {convertDate('tanggalHari', item.created_at)}
      </p>
    </div>
  );
}
