import React from 'react';

export default function SkeletonDashboardSummary() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6 mx-4">
      <div className="flex col-span-2 justify-between items-center space-x-4 p-4 bg-white rounded-lg">
        <div className="flex flex-col justify-between">
          <div className="bg-zinc-200 animate-pulse w-44 h-6 rounded-lg" />
          <div className="bg-zinc-200 animate-pulse w-12 h-6 rounded-lg mt-2" />
          <div className="bg-zinc-200 animate-pulse w-24 h-4 rounded-lg mt-4" />
        </div>
        <div className="h-24 w-24 rounded-full border-8 border-zinc-200 animate-pulse flex justify-center items-center"></div>
      </div>

      {Array.from({ length: 2 }).map((item) => (
        <div
          key={Math.random()}
          className="flex flex-col space-y-4 bg-white rounded-lg p-4">
          <div className="h-12 w-12 bg-zinc-200 rounded-full animate-pulse" />
          <div className="flex justify-between items-center w-full">
            <div className="h-4 bg-zinc-200 flex animate-pulse w-10" />
            <div className="h-6 bg-zinc-200 flex animate-pulse w-12" />
          </div>
        </div>
      ))}
      <div className="flex col-span-2 space-x-4 items-centerp-4 bg-white rounded-lg p-4">
        <div className="h-14 w-14 rounded-full bg-zinc-200 animate-pulse flex justify-center items-center"></div>
        <div className="flex flex-col justify-between">
          <div className="bg-zinc-200 animate-pulse w-44 h-6 rounded-lg" />
          <div className="flex space-x-2 mt-4">
            <div className="bg-zinc-200 animate-pulse w-12 h-6 rounded-lg mt-2" />
            <div className="bg-zinc-200 animate-pulse w-24 h-4 rounded-lg mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
