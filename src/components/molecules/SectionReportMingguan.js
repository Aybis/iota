import {
  BeakerIcon,
  CheckIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  LoginIcon,
  OfficeBuildingIcon,
  PhoneMissedCallIcon,
  XIcon,
} from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';

import React from 'react';
import { convertDate } from '../../helpers/convertDate';

export default function SectionReportMingguan({ item }) {
  const titleCard = (title) => {
    switch (title) {
      case 'WFO':
        return 'At Office';
      case 'WFH':
        return 'At Home';
      case 'sppd':
        return 'Buss. Trip';
      case 'SPPD':
        return 'Buss. Trip';
      case 'izin':
        return 'Permit';
      case 'Izin':
        return 'Permit';
      case 'absent':
        return 'Tidak Absen';
      case 'hadir':
        return 'Kehadiran';
      case 'cuti':
        return 'Leave';
      case 'sakit':
        return 'Sick';
      case 'Cuti':
        return 'Leave';
      case 'Sakit':
        return 'Sick';
      case 'kehadiran':
        return 'Presence';

      case 'Tidak Absen':
        return 'Absent';

      default:
        return title;
    }
  };

  const IconThumbnail = ({ name, addClas }) => {
    switch (name) {
      case 'WFH':
        return <HomeIcon className={[addClas, 'text-white'].join(' ')} />;
      case 'WFO':
        return (
          <OfficeBuildingIcon className={[addClas, 'text-white'].join(' ')} />
        );
      case 'izin':
        return (
          <ClipboardListIcon className={[addClas, 'text-zinc-500'].join(' ')} />
        );
      case 'Izin':
        return (
          <ClipboardListIcon className={[addClas, 'text-zinc-500'].join(' ')} />
        );
      case 'sakit':
        return (
          <BeakerIcon className={[addClas, 'text-orange-500'].join(' ')} />
        );
      case 'Sakit':
        return (
          <BeakerIcon className={[addClas, 'text-orange-500'].join(' ')} />
        );
      case 'cuti':
        return (
          <PhoneMissedCallIcon
            className={[addClas, 'text-red-500'].join(' ')}
          />
        );
      case 'Cuti':
        return (
          <PhoneMissedCallIcon
            className={[addClas, 'text-red-500'].join(' ')}
          />
        );
      case 'sppd':
        return <GlobeAltIcon className={[addClas, 'text-white'].join(' ')} />;
      case 'SPPD':
        return <GlobeAltIcon className={[addClas, 'text-white'].join(' ')} />;
      case 'absent':
        return <XIcon className={[addClas, 'text-red-500'].join(' ')} />;

      case 'Tidak Absen':
        return <XIcon className={[addClas, 'text-red-500'].join(' ')} />;

      case 'keterangan':
        return (
          <ClipboardCheckIcon
            className={[addClas, 'text-teal-500'].join(' ')}
          />
        );

      case 'belum absen':
        return <LoginIcon className={[addClas, 'text-red-500'].join(' ')} />;

      case 'Tidak Checkout':
        return <LogoutIcon className={[addClas, 'text-red-500'].join(' ')} />;
      case 'hadir':
        return <CheckIcon className={[addClas, 'text-blue-500'].join(' ')} />;

      case 'terlambat':
        return <ClockIcon className={[addClas, 'text-amber-500'].join(' ')} />;

      default:
        return <HomeIcon className={addClas} />;
    }
  };

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
          <IconThumbnail name={item.kehadiran} addClas="h-10 w-10" />
        ) : (
          <IconThumbnail name={item.kondisi} addClas="h-10 w-10" />
        )}
      </span>
      <p className="font-semibold text-zinc-900 text-sm lg:text-lg capitalize">
        {item.kehadiran ? titleCard(item.kehadiran) : titleCard(item.kondisi)}
      </p>
      <p className="font-medium text-sm lg:text-base text-zinc-500">
        {convertDate('tanggalHari', item.created_at)}
      </p>
    </div>
  );
}
