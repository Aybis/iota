import React from 'react';
import { getImageFromAssets } from '../../helpers/assetHelpers';

export default function Header() {
  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Report', href: '#' },
    { name: 'Activity', href: '#' },
    { name: 'Dashboard', href: '#' },
  ];

  return (
    <div className="bg-gray-900 py-6 hidden lg:block">
      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
        aria-label="Global">
        <div className="flex items-center flex-1">
          <div className="hidden lg:flex items-center justify-between w-full md:w-auto">
            <p>
              <span className="sr-only">IOTA</span>
              <img
                className=" h-8 w-auto sm:h-10"
                src={getImageFromAssets('/assets/icon.svg')}
                alt=""
              />
            </p>
          </div>
          <div className="hidden space-x-8 md:flex md:ml-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base font-medium text-white hover:text-gray-300">
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-6">
          <p className="text-base font-medium text-white hover:text-gray-300">
            Abdul Muchtar
          </p>
          <p className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
            Sign Out
          </p>
        </div>
      </nav>
    </div>
  );
}
