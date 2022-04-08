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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

export default function BottomBar() {
  const USER = useSelector((state) => state.user);

  let link = '/checkin';
  let name = 'Checkin';
  let colorIcon = 'bg-blue-600';
  const location = useLocation();

  const [menumobiles, setmenumobiles] = useState([]);

  useEffect(() => {
    USER?.profile?.role_id === '1'
      ? setmenumobiles([
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
        ])
      : setmenumobiles([
          {
            link: '/',
            name: 'Home',
            icon: Home,
            iconActive: HomeSolid,
          },
          {
            link: '/absensi',
            name: 'Absensi',
            icon: ClipboardCheckIcon,
            iconActive: ClipboardCheckIconSolid,
          },
          {
            link: '/activities',
            name: 'Activity',
            icon: Clipboard,
            iconActive: ClipboardSolid,
          },
        ]);
  }, [USER]);

  // const handlerLogOut = () => {
  //   swal({
  //     title: 'Are you sure?',
  //     text: 'Anda yakin ingin keluar dari aplikasi!',
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       Cookies.remove('session');
  //       localStorage.clear();
  //       swal('Anda berhasil logout!', {
  //         icon: 'success',
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 300);
  //     } else {
  //       swal('Okay!');
  //     }
  //   });
  // };

  return (
    <div className="fixed z-30 bottom-0 inset-x-0 lg:hidden shadow-xl">
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
