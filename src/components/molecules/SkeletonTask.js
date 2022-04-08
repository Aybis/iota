import React from 'react';

export default function SkeletonTask() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="flex flex-col p-4 bg-white rounded-lg w-full">
        <div className="flex justify-between">
          <div className="h-4 bg-zinc-200 w-44 animate-pulse rounded-lg" />
          <div className="h-4 bg-zinc-200 w-12 animate-pulse rounded-lg" />
        </div>
        <div className="h-6 mt-4 bg-zinc-200 w-full animate-pulse rounded-lg"></div>
        <div className="h-2 mt-2 bg-zinc-200 w-full animate-pulse rounded-lg"></div>
        <div className="h-6 mt-4 bg-zinc-200 w-full animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}
