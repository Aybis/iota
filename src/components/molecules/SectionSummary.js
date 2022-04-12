import { LogoutIcon } from '@heroicons/react/outline';
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
import { motion } from 'framer-motion';
import React from 'react';

export default function SectionSummary({
  data,
  type,
  handlerClick = undefined,
  isEvent = false,
}) {
  const titleCard = (title) => {
    switch (title) {
      case 'WFO':
        return 'At Office';
      case 'WFH':
        return 'At Home';
      case 'sppd':
        return 'SPPD';
      case 'izin':
        return 'Ijin';
      case 'absent':
        return 'Tidak Absen';
      case 'hadir':
        return 'Kehadiran';

      default:
        return title;
    }
  };

  const IconThumbnail = ({ name, addClas }) => {
    switch (name) {
      case 'WFH':
        return <HomeIcon className={[addClas, 'text-green-500'].join(' ')} />;
      case 'WFO':
        return (
          <OfficeBuildingIcon
            className={[addClas, 'text-blue-500'].join(' ')}
          />
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
        return (
          <GlobeAltIcon className={[addClas, 'text-indigo-500'].join(' ')} />
        );
      case 'SPPD':
        return (
          <GlobeAltIcon className={[addClas, 'text-indigo-500'].join(' ')} />
        );
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
    <motion.div
      whileTap={
        isEvent && {
          scale: 0.95,
        }
      }
      whileHover={
        isEvent && {
          scale: 1.05,
        }
      }
      {...(isEvent && { onClick: () => handlerClick(data) })}
      className={[
        'relative flex justify-between bg-white rounded-md p-4 ',
        isEvent && 'cursor-pointer',
      ].join(' ')}>
      <div className="flex flex-col">
        <p className="text-sm font-medium lg:text-base text-zinc-500 capitalize">
          {titleCard(data.name ?? '')}
        </p>
        <p className=" text-zinc-900">
          <span className="text-lg lg:text-xl lg:font-bold font-semibold text-zinc-900">
            {data.value}
          </span>{' '}
          <small className="text-sm font-normal text-zinc-500">{type}</small>
        </p>
      </div>
      <div className="">
        <IconThumbnail name={data.name} addClas="h-10 w-10" />
      </div>
    </motion.div>
  );
}
