import React from 'react';

export default function TableHeading({
  theading,
  children,
  addClassTable,
  addClassHeading,
}) {
  return (
    <table
      className={[
        'text-left w-full lg:min-w-full divide-y divide-zinc-200 max-h-3.5 rounded-md',
        addClassTable,
      ].join(' ')}>
      <thead className="bg-zinc-100 rounded">
        <tr>
          {theading.map((item) => (
            <th
              key={Math.random()}
              scope="col"
              className={[
                'p-3 text-left font-medium text-zinc-500 capitalize tracking-wide',
                addClassHeading,
              ].join(' ')}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="w-full">{children}</tbody>
    </table>
  );
}
