import React from 'react';

export default function SectionFilterMonthYear({
  month,
  year,
  handlerChange,
  showMonth = true,
  showYear = true,
}) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'All',
  ];

  return (
    <div
      className={[
        'relative grid lg:w-lg gap-4 mt-6',
        !showMonth || !showYear ? 'grid-cols-1' : 'grid-cols-2',
      ].join(' ')}>
      {showMonth && (
        <select
          value={month}
          name="month"
          onChange={(event) => handlerChange(event)}
          className="px-4 py-2 rounded bg-white border-2 pr-8 border-transparent focus:border-blue-500">
          {months.map((item, index) => (
            <option
              key={Math.random()}
              value={
                item === 'All'
                  ? 'all'
                  : index + 1 < 10
                  ? `0${index + 1}`
                  : index + 1
              }>
              {item}
            </option>
          ))}
        </select>
      )}

      {showYear && (
        <select
          name="year"
          onChange={(event) => handlerChange(event)}
          value={year}
          className={[
            'px-4 py-2 rounded bg-white border-2 pr-8 border-transparent focus:border-blue-500',
            showYear && 'w-full',
          ].join(' ')}>
          <option value="2022">2022</option>
        </select>
      )}
    </div>
  );
}
