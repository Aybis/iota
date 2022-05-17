import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react';
import { imageApi } from '../../helpers/assetHelpers';

export default function SectionCardEmployee({
  item,
  handlerClick,
  handlerDelete,
  isAdmin,
}) {
  return (
    <div className="bg-white relative shadow-lg shadow-zinc-200/40 flex flex-col text-center rounded-lg divide-y divide-gray-200">
      <div
        className="flex-1 flex flex-col p-4 lg:p-8 cursor-pointer group "
        onClick={() => handlerClick('view', item)}>
        <img
          className="w-20 h-20 lg:w-32 lg:h-32 flex-shrink-0 mx-auto rounded-full group-hover:scale-110 transition-all duration-300 ease-in-out"
          src={imageApi(item.name)}
          alt=""
        />
        <h3 className="mt-6 text-gray-900 text-sm font-medium uppercase">
          {item.name}
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-500 text-xs md:text-sm">{item.nik}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <span
              className={[
                'px-2 py-1  text-xs font-medium  rounded-full',
                item.role_id === '3' && 'bg-red-100 text-red-800',
                item.role_id === '2' && 'bg-green-100 text-green-800',
                item.role_id === '1' && 'bg-yellow-100 text-yellow-800',
              ].join(' ')}>
              {item.role_id === '3'
                ? 'Leader'
                : item.role_id === '2'
                ? 'Manager'
                : 'Teknisi'}
            </span>
          </dd>
        </dl>
      </div>

      {isAdmin && (
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex group hover:bg-red-500 transition-all duration-300 ease-in-out rounded-bl-lg">
              <button
                onClick={(e) => handlerDelete(e, item)}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-xs md:text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-white group">
                <TrashIcon
                  className="md:w-5 md:h-5 h-4 w-4 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="ml-3">Delete</span>
              </button>
            </div>
            <div className="-ml-px w-0 flex-1 flex rounded-br-lg group hover:bg-green-500 transition-all duration-300 ease-in-out">
              <button
                onClick={() => handlerClick('update', item)}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-xs md:text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-white group">
                <PencilAltIcon
                  className="md:w-5 md:h-5 h-4 w-4 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="ml-3">Update</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
