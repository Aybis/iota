import {
  ChartBarIcon as Chart,
  ClipboardCheckIcon,
  ClipboardListIcon as Clipboard,
  CogIcon,
  FingerPrintIcon,
  HomeIcon as Home,
} from '@heroicons/react/outline';
import {
  ChartBarIcon as ChartSolid,
  ClipboardCheckIcon as ClipboardCheckIconSolid,
  ClipboardListIcon as ClipboardSolid,
  FingerPrintIcon as FingerSolid,
  HomeIcon as HomeSolid,
  CogIcon as CogSolid,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { convertDate } from '../../helpers/convertDate';

export default function BottomBar() {
  const USER = useSelector((state) => state.user);
  const ABSEN = useSelector((state) => state.absen);

  let link = '/checkin';
  let name = 'Checkin';
  let colorIcon = 'bg-blue-600';
  const location = useLocation();

  const [menumobiles, setmenumobiles] = useState([]);

  useEffect(() => {
    if (USER?.profile?.role_id === '1') {
      setmenumobiles([
        {
          link: '/',
          name: 'Home',
          icon: Home,
          iconActive: HomeSolid,
        },
        {
          link: '/activity',
          name: 'Activity',
          icon: ClipboardCheckIcon,
          iconActive: ClipboardCheckIconSolid,
        },

        {
          link: '/checkin',
          name: 'Check-in',
          icon: FingerPrintIcon,
          iconActive: FingerSolid,
        },
        {
          link: '/report',
          name: 'Report',
          icon: Clipboard,
          iconActive: ClipboardSolid,
        },
        {
          link: '/dashboard',
          name: 'Summary',
          icon: Chart,
          iconActive: ChartSolid,
        },
      ]);
    }

    if (USER?.profile?.role_id === '2') {
      setmenumobiles([
        {
          link: '/',
          name: 'Home',
          icon: Home,
          iconActive: HomeSolid,
        },
        {
          link: '/absensi',
          name: 'Attendance',
          icon: ClipboardCheckIcon,
          iconActive: ClipboardCheckIconSolid,
        },
        {
          link: '/activities',
          name: 'Activity',
          icon: CogIcon,
          iconActive: ClipboardSolid,
        },
      ]);
    }
    if (USER?.profile?.role_id === '3') {
      setmenumobiles([
        {
          link: '/',
          name: 'Home',
          icon: Home,
          iconActive: HomeSolid,
        },
        {
          link: '/absensi',
          name: 'Attendance',
          icon: ClipboardCheckIcon,
          iconActive: ClipboardCheckIconSolid,
        },
        {
          link: '/activities',
          name: 'Activity',
          icon: Clipboard,
          iconActive: ClipboardSolid,
        },
        {
          link: '/management',
          name: 'Management',
          icon: CogIcon,
          iconActive: CogSolid,
        },
      ]);
    }
  }, [USER]);

  if (ABSEN?.absen === undefined) {
    link = '/checkin';
  } else {
    if (ABSEN?.checkout?.jam) {
      link = 'hidden';
      if (
        convertDate('tanggal', ABSEN?.checkin?.jam) !== convertDate('tanggal')
      ) {
        link = '/checkin';
      }
    } else if (ABSEN?.checkin?.jam) {
      colorIcon = 'bg-red-600';
      name = 'Checkout';
      link = `/checkout/${ABSEN?.absen?.id}`;
    }
  }

  return (
    <div
      className={[
        'fixed z-30 bottom-0 inset-x-0 ',
        USER?.profile?.role_id === '1'
          ? 'max-w-md mx-auto container'
          : 'lg:hidden',
      ].join(' ')}>
      <div
        className={[
          `bg-white shadow-2xl  mb-0 py-1 border-t border-gray-200 border-opacity-50`,
          USER?.profile?.role_id === '1'
            ? `grid ${
                link === 'hidden' ? 'grid-cols-4' : 'grid-cols-5'
              } place-items-center`
            : 'flex justify-evenly items-center',
        ].join(' ')}>
        {menumobiles.map((menu) =>
          menu.link === '/checkin' ? (
            link !== 'hidden' && (
              <NavLink
                key={Math.random()}
                to={link}
                exact={`true`}
                className="rounded-md transition-all duration-300 ease-in-out text-white font-semibold -mt-7 cursor-pointer">
                <menu.icon
                  className={`h-10 w-10 p-1 mx-auto  rounded-full ring-8 ring-white ${colorIcon} `}
                />

                <p className={`text-xs mt-1 text-zinc-800 font-bold`}>{name}</p>
              </NavLink>
            )
          ) : (
            <NavLink
              key={Math.random()}
              to={menu.link ?? '/'}
              exact={`true`}
              className={[
                'rounded-md p-2 transition-all duration-300 ease-in-out text-xs cursor-pointer',
                location.pathname === menu.link
                  ? 'text-blue-600 font-semibold'
                  : 'text-zinc-300 font-normal',
              ].join(' ')}>
              {location.pathname === menu.link ? (
                <menu.iconActive className="h-5 w-5 mx-auto" />
              ) : (
                <menu.icon className="h-5 w-5 mx-auto" />
              )}
              <p className="text-xs mt-1">{menu.name}</p>
            </NavLink>
          ),
        )}
      </div>
    </div>
  );
}
