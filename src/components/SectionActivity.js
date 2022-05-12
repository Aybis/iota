import React from 'react';
import { Link } from 'react-router-dom';
import {
  getImageFromAssets,
  getImageFromStorage,
} from '../helpers/assetHelpers';
import { convertDate } from '../helpers/convertDate';
import { ProgressBar } from './atoms';

export default function SectionActivity({
  title,
  desc,
  date,
  progress,
  showUpdated,
  totalUpdate = 0,
  status = '',
  idActivity,
  handlerClick,
}) {
  return (
    <Link
      to={`/activity/${idActivity}`}
      onClick={handlerClick ?? null}
      className="relative flex flex-col p-4 bg-white w-full rounded-lg shadow-lg shadow-zinc-200/50 group hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="relative flex flex-col w-full ">
        <div className="relative flex flex-col flex-none w-64">
          <h1 className="text-sm font-semibold text-zinc-800 capitalize">
            {title}
          </h1>
          <p className="text-xs text-zinc-500 mt-2 font-medium">{desc}</p>
        </div>

        <div className="absolute top-0 text-xs text-zinc-400 right-0">
          {convertDate('tanggalShort', date) ?? 'Rabu, 12 Maret'}
        </div>
        {/* <div
          className={[
            'flex absolute px-3 py-1 rounded-md text-xs font-medium text-white -top-4 right-1',
            progress === 100 ? 'bg-teal-500' : 'bg-amber-500',
          ].join(' ')}>
          <p className="text-xs  capitalize">
            {progress === 100 ? 'completed' : 'to do'}
          </p>
        </div> */}

        <ProgressBar moreClass={'mt-5 mb-3'} progress={progress} />
        <div className="relative mt-2">
          {totalUpdate.length > 0 && (
            <div className="flex justify-between items-center">
              <div className="flex -space-x-3" key={Math.random()}>
                {totalUpdate.slice(0, 7).map((item) => (
                  <img
                    key={Math.random()}
                    src={
                      item.photo
                        ? getImageFromStorage(item.photo)
                        : getImageFromAssets('/assets/nfimage.jpeg')
                    }
                    alt=""
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-zinc-100 object-top"
                  />
                ))}
              </div>
              <p className="text-zinc-500 text-xs font-medium">
                {' '}
                +{totalUpdate.length} updated
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
