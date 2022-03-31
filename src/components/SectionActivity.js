import React from 'react';
import { Link } from 'react-router-dom';
import { getImageFromAssets } from '../helpers/assetHelpers';

export default function SectionActivity({
  title,
  desc,
  date,
  progress,
  showUpdated,
  totalUpdate = 0,
  status = '',
}) {
  return (
    <Link
      to={'/activity/detail'}
      className="relative flex space-x-4 p-3 bg-white w-full rounded-lg shadow-lg shadow-zinc-200/50">
      <div className="relative flex flex-col w-full space-y-4 ">
        <div className="relative flex flex-col">
          <h1 className="text-sm font-semibold text-zinc-800">{title}</h1>
          <p className="text-xs text-zinc-500">{date}</p>
        </div>
        <div
          className={[
            'flex absolute px-3 py-1 rounded-md text-xs font-medium text-white -top-4 right-1',
            progress === 100 ? 'bg-teal-500' : 'bg-amber-500',
          ].join(' ')}>
          <p className="text-xs  capitalize">
            {progress === 100 ? 'completed' : 'to do'}
          </p>
        </div>

        {totalUpdate > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-3" key={Math.random()}>
              {Array.from({ length: totalUpdate }).map((item) => (
                <img
                  key={Math.random()}
                  src={getImageFromAssets('/assets/img.jpeg')}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                />
              ))}
            </div>
            <p className="text-zinc-500 text-xs font-medium">
              {' '}
              +{totalUpdate} updated
            </p>
          </div>
        )}

        <div className="flex items-center space-x-6">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={[
                ' h-1.5 rounded-full',
                progress === 100 ? 'bg-teal-500' : 'bg-amber-500',
              ].join(' ')}
              style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-zinc-400 font-medium">{progress}%</p>
        </div>
      </div>
    </Link>
  );
}
