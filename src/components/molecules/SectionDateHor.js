import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { convertDate } from '../../helpers/convertDate';

export default function SectionDateHor({ setDate, handlerChange }) {
  const [listDay, setlistDay] = useState([]);
  const scrollRef = useRef(null);

  const [activeRef, setactiveRef] = useState(useRef(null));
  const [dayNow, setdayNow] = useState(
    new Date().toLocaleString('en-EN', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      year: 'numeric',
    }),
  );

  const getAllDaysInMonth = (month, year) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() }, // get next month, zeroth's (previous) day
      (_, i) => new Date(year, month - 1, i + 1), // get current month (0 based index)
    );

  const scroll = async (e, item) => {
    setdayNow(item.timestamp);
    setDate(item.uniq);

    if (activeRef.current !== null) {
      let node = ReactDOM.findDOMNode(activeRef);
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  useEffect(() => {
    const result = getAllDaysInMonth(
      convertDate('bulan'),
      convertDate('tahun'),
    ).map((x) => {
      return {
        day: x.toLocaleString('en-EN', {
          weekday: 'short',
        }),
        date: x.toLocaleString('en-EN', {
          day: 'numeric',
        }),
        uniq: x.toLocaleString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        timestamp: x.toLocaleString('en-EN', {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          year: 'numeric',
        }),
      };
    });

    setlistDay(result);

    if (activeRef.current !== null) {
      let node = ReactDOM.findDOMNode(activeRef);
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRef]);

  return (
    <div
      className="flex overflow-x-scroll space-x-3 px-4 pb-5 mt-6 hidden-scroll "
      ref={scrollRef}>
      {listDay?.map((item, i) => (
        <div
          onClick={(e) => {
            scroll(e, item);
            handlerChange(item);
          }}
          key={i}
          ref={(ref) => {
            if (dayNow === item.timestamp) {
              setactiveRef(ref);
            }
          }}
          className={[
            'flex justify-center items-center px-3 py-1 flex-col rounded-lg shadow-lg ',
            dayNow === item.timestamp
              ? 'bg-blue-500 text-white font-semibold shadow-blue-500/50'
              : 'bg-white text-zinc-400 font-medium shadow-zinc-200/40',
          ].join(' ')}>
          <span className="text-sm">{item.day}</span>
          <span className="">{item.date}</span>
        </div>
      ))}
    </div>
  );
}
