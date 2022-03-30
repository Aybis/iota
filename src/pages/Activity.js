import { PlusIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { SectionActivity } from '../components';
import Layout from './includes/Layout';

export default function Activity() {
  const [listDay, setlistDay] = useState({});
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const ref = useRef('active');

  const dateNow = new Date().toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
  });

  const getAllDaysInMonth = (month, year) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() }, // get next month, zeroth's (previous) day
      (_, i) => new Date(year, month - 1, i + 1), // get current month (0 based index)
    );

  const dataActivity = [
    {
      title: 'Create Homepage',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: 'Rabu, 30 Maret 2022',
      totalUpdate: 4,
      progress: 100,
    },
    {
      title: 'Create Activity Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: 'Rabu, 30 Maret 2022',
      totalUpdate: 3,
      progress: 73,
    },
    {
      title: 'Create Report Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: 'Rabu, 30 Maret 2022',
      progress: 0,
    },
    {
      title: 'Create Dashboard Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: 'Rabu, 30 Maret 2022',
      progress: 0,
    },
    {
      title: 'Create Summary Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: 'Rabu, 30 Maret 2022',
      progress: 0,
    },
  ];

  useEffect(() => {
    const result = getAllDaysInMonth(month + 1, year).map((x) => {
      return x.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
      });
    });

    setlistDay(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scroll = () => {
    // console.log(ref.current);
    let node = ReactDOM.findDOMNode(ref.current);
    node.scrollIntoView({ block: 'start', behavior: 'smooth' });
    // ref.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'center',
    //   inline: 'center',
    // });
  };
  return (
    <Layout>
      <div className="relative mx-4 mt-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-zinc-500 text-lg">Today</p>

            <h1 className="text-zinc-800 text-2xl font-bold">Rabu, 30 Maret</h1>
          </div>
          <div className="h-10 w-10 rounded-lg bg-blue-500 flex justify-center items-center shadow shadow-blue-500/50">
            <PlusIcon className="h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="relative flex space-x-2 overflow-x-auto hidden-scroll px-4 mt-8">
        {listDay.length > 0 &&
          listDay?.map((item, index) => (
            <div
              ref={ref}
              key={index}
              onClick={() => scroll()}
              className={[
                'flex  rounded-lg text-center justify-center items-center flex-1 w-fit px-4 py-2 text-sm  ',
                dateNow === item
                  ? 'bg-blue-500 shadow-blue-500/50 font-semibold text-white active'
                  : 'bg-zinc-200 text-zinc-500 font-medium',
              ].join(' ')}>
              {item}
            </div>
          ))}
      </div>

      <hr className="mx-4 mt-4" />

      <div className="relative my-4 mx-4">
        <h1 className="text-zinc-800 font-semibold">List Activity</h1>

        <div className="grid grid-cols-1 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {dataActivity.map((item) => (
              <SectionActivity
                key={Math.random()}
                title={item.title}
                date={item.date}
                desc={item.desc}
                totalUpdate={item.totalUpdate}
                progress={item.progress}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
