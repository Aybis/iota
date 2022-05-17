import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';

export default function SearchInput({
  name,
  value,
  onchange,
  placeholder,
  addClassInput,
  addClassParent,
}) {
  return (
    <div
      className={['mt-1 relative rounded-md shadow-sm', addClassParent].join(
        ' ',
      )}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onchange}
        className={[
          'focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-zinc-200 rounded-md',
          addClassInput,
        ].join(' ')}
        placeholder={placeholder}
      />
    </div>
  );
}
