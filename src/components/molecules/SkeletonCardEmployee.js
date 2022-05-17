import React from 'react';
import { imageApi } from '../../helpers/assetHelpers';

export default function SkeletonCardEmployee() {
  return (
    <div className=" bg-white p-4 relative flex flex-col justify-center items-center space-y-4 shadow-lg shadow-zinc-200/40  rounded-lg">
      <img
        src={imageApi('')}
        alt=""
        className="h-20 w-20 rounded-lg animate-pulse"
      />
      <div className="relative w-full h-auto">
        <div className="relative text-sm text-zinc-700 font-semibold h-6 bg-zinc-100 rounded-md w-full transition-all animate-pulse"></div>
        <div className="relative mt-2 text-zinc-400 capitalize h-6 bg-zinc-100 rounded-md w-full transition-all animate-pulse"></div>
      </div>
    </div>
  );
}
