import {
  ChartBarIcon as Chart,
  ClipboardCheckIcon,
  ClipboardListIcon as Clipboard,
  FingerPrintIcon,
  HomeIcon as Home,
} from '@heroicons/react/outline';
import {
  ChartBarIcon as ChartSolid,
  ClipboardCheckIcon as ClipboardCheckIconSolid,
  ClipboardListIcon as ClipboardSolid,
  FingerPrintIcon as FingerSolid,
  HomeIcon as HomeSolid,
} from '@heroicons/react/solid';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function BottomBar() {
  let link = '/checkin';
  let name = 'Checkin';
  let colorIcon = 'bg-blue-600';
  const location = useLocation();

  const menumobiles = [
    {
      link: '/',
      name: 'Home',
      icon: Home,
      iconActive: HomeSolid,
    },
    {
      link: '/report',
      name: 'Laporan',
      icon: Clipboard,
      iconActive: ClipboardSolid,
    },
    {
      link: '/checkin',
      name: 'Check-in',
      icon: FingerPrintIcon,
      iconActive: FingerSolid,
    },
    {
      link: '/activity',
      name: 'Activity',
      icon: ClipboardCheckIcon,
      iconActive: ClipboardCheckIconSolid,
    },
    {
      link: '/dashboard',
      name: 'Summary',
      icon: Chart,
      iconActive: ChartSolid,
    },
  ];

  return (
    <div className="fixed z-30 bottom-0 inset-x-0 lg:hidden shadow-xl">
      <div
        className={`bg-white shadow-2xl grid ${
          link === 'hidden' ? 'grid-cols-4' : 'grid-cols-5'
        } place-items-center mb-0 py-1 border-t border-gray-200 border-opacity-50`}>
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
