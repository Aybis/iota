import React from 'react';

export default function Select({
  children,
  value,
  onchange,
  isDisabled = false,
  placeholder,
  addClassInput,
  labelName,
  name,
  addClassLabel,
  addClassParent,
}) {
  return (
    <div className={['sm:col-span-3 text-left', addClassParent].join(' ')}>
      <label
        htmlFor={name}
        className={[
          'block text-sm text-gray-700 capitalize',
          addClassLabel,
        ].join(' ')}>
        {labelName}
      </label>
      <select
        onChange={onchange}
        disabled={isDisabled}
        name={name}
        value={value}
        className={[
          'disabled:bg-zinc-100 disabled:cursor-not-allowed mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md',
          addClassInput,
        ].join(' ')}>
        <option value="" disabled>
          Choose {labelName}
        </option>
        {children}
      </select>
    </div>
  );
}
