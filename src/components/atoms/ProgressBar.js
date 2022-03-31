import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className="flex items-center space-x-6 mt-4">
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={[
            'h-1.5 rounded-full',
            progress === 100 ? 'bg-teal-500 ' : 'bg-amber-500',
          ].join(' ')}
          style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-zinc-400 font-medium">{progress}%</p>
    </div>
  );
}
