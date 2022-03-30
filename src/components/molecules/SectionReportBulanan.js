import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import React from 'react';
import { ReportAbsen, ReportTime } from '.';
import { convertDate } from '../../helpers/convertDate';

export default function SectionReportBulanan({ item, handlerClickImage }) {
  return (
    <div className="shadow-lg shadow-zinc-200/50 bg-white rounded-lg p-3 relative flex flex-col lg:flex-row gap-2 justify-between ">
      <div
        className={[
          'absolute lg:hidden top-3 right-4 rounded text-xs px-2 py-1 shadow-md  text-white font-medium capitalize',
          item.kehadiran === 'WFH'
            ? 'shadow-green-500/50 bg-green-500'
            : 'shadow-blue-500/50 bg-blue-500',
          item.kehadiran === null &&
            'shadow-yellow-500/50 bg-yellow-500 text-black',
        ].join(' ')}>
        {item.kehadiran
          ? item.kehadiran === 'WFH'
            ? 'At Home'
            : 'At Office'
          : item.kondisi}
      </div>
      {/* Checkin */}
      <ReportAbsen
        tanggal={item.detail_absensi[0].jam}
        jam={item.detail_absensi[0].jam}
        lokasi={item.detail_absensi[0].lokasi}
        image={item.detail_absensi[0].photo}
        handlerClickImage={handlerClickImage}
        kehadiran={item.kehadiran}
        checkout={item.checkout_status}
        keterangan={item.keterangan}
      />
      {/* icon  */}
      <hr className="border lg:hidden border-gray-100 rounded-full ml-16" />
      <div className="relative lg:flex flex-col justify-between hidden ">
        <div className="flex justify-center items-center">
          <ArrowLeftIcon className="text-blue-600 h-4 w-4 mt-2" />
          <ArrowRightIcon className="text-blue-600 h-4 w-4 mt-4 -ml-1" />
        </div>
        <div className="grid grid-cols-4 gap-8">
          <ReportTime
            time={convertDate('jamMenit', item.detail_absensi[0].jam)}
            status={'IN'}
          />
          <ReportTime
            time={
              item.detail_absensi[1]?.jam
                ? convertDate('jamMenit', item.detail_absensi[1]?.jam)
                : ' '
            }
            status={'OUT'}
          />
          <ReportTime time={item.kehadiran} status={'WRK'} />
          <ReportTime time={item.kondisi} status={'STA'} />
        </div>
      </div>
      {/* Checkout */}
      {item.detail_absensi[1] ? (
        <ReportAbsen
          tanggal={item.detail_absensi[1].jam}
          jam={item.detail_absensi[1].jam}
          lokasi={item.detail_absensi[1].lokasi}
          image={item.detail_absensi[1].photo}
          handlerClickImage={handlerClickImage}
          checkout={item.checkout_status}
          kehadiran={item.kehadiran}
          type={'out'}
        />
      ) : (
        <div className="flex justify-center items-center font-semibold text-blue-900 animate-pulse lg:w-2/3 ">
          On Duty
        </div>
      )}
    </div>
  );
}
