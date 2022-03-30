import React from 'react';

export default function ReportTime({ time, status }) {
  return (
    <div className="flex flex-col gap-1 items-center justify-end">
      <h1 className="font-semibold text-zinc-900 capitalize">{time}</h1>
      <p className="font-normal text-zinc-500 text-sm">{status}</p>
    </div>
  );
}
