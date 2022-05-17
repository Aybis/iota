import React from 'react';
import { Link } from 'react-router-dom';
import { getImageFromAssets } from '../../helpers/assetHelpers';

export default function RedirectPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 sm:py-12 md:py-20 sm:mt-12 lg:px-8 lg:py-24 relative flex flex-col space-y-4 justify-center items-center transition-all duration-300 ease-in-out">
      <div className="relative mt-12 md:mt-0 transition-all duration-300 ease-in-out">
        <img
          src={getImageFromAssets('/assets/notfound.svg')}
          alt=""
          className="h-72 object-cover transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 sm:py-12 md:py-20 lg:px-8 transition-all duration-300 ease-in-out">
        <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">
          404 error
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-zinc-800 tracking-tight sm:text-5xl">
          Uh oh! I think you’re lost.
        </h1>
        <p className="mt-4 text-lg font-medium text-black text-opacity-50">
          It looks like the page you’re looking for doesn't exist.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-blue-500 text-white bg-opacity-75 transition-all duration-300 ease-in-out sm:hover:bg-opacity-50">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
