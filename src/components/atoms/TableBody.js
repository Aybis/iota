import React from 'react';

export default function TableBody({ children, index, addClass }) {
  return (
    <tr
      className={[
        'h-14 text-sm font-semibold leading-none text-zinc-800 bg-white hover:bg-zinc-100 border-b border-t border-zinc-100',
        index % 2 === 0 ? 'bg-white' : 'bg-zinc-50',
        addClass,
      ].join(' ')}>
      {children}
    </tr>
  );
}
