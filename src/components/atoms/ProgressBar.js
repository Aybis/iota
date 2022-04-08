import React from 'react';

export default function ProgressBar({ progress, date, moreClass }) {
  return (
    <div className={['flex flex-col space-y-2 mt-4', moreClass].join(' ')}>
      <div className="flex justify-between items-center">
        <p className="text-xs text-zinc-400 font-medium">
          <span className="text-blue-500 font-bold"> {progress}</span> of 100%
        </p>

        {/* <p className="text-xs text-zinc-400">
          Upd : {convertDate('tanggalShort', date)}
        </p> */}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={[
            'h-1.5 rounded-full shadow-md shadow-blue-500/50',
            progress === 100 ? 'bg-blue-400 ' : 'bg-blue-400',
          ].join(' ')}
          style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
