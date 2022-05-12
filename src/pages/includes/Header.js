import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProfileDropdown } from '../../components/molecules';
import { getImageFromAssets } from '../../helpers/assetHelpers';

export default function Header() {
  const location = useLocation();
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Attendance', href: '/absensi' },
    { name: 'Activity', href: '/activities' },
    { name: 'Management', href: '/management' },
  ];

  return (
    <div className="bg-white border-b-2 border-zinc-100 shadow-lg shadow-zinc-100/50 p-6 hidden lg:block fixed top-0 inset-x-0 z-10">
      <nav
        className=" max-w-7xl mx-auto flex items-center justify-evenly px-4 sm:px-6"
        aria-label="Global">
        <div className="flex justify-between items-center flex-1">
          <div className="hidden lg:flex items-center justify-between w-full md:w-auto">
            <p>
              <span className="sr-only">IOTA</span>
              <img
                className=" h-8 w-auto sm:h-10"
                src={getImageFromAssets('/assets/logo.svg')}
                alt=""
              />
            </p>
          </div>
          <div className="hidden space-x-8 md:flex justify-between items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={[
                  location.pathname === item.href
                    ? 'font-semibold text-zinc-800 border-blue-500'
                    : 'text-base font-medium text-zinc-400 hover:text-gray-300',
                  'border-b-2 pb-1 border-transparent hover:border-blue-500 transition-all duration-500 ease-in-out hover:text-zinc-800',
                ].join(' ')}>
                {item.name}
              </Link>
            ))}
          </div>
          <ProfileDropdown />
        </div>
      </nav>
    </div>
  );
}
