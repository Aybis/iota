import { BadgeCheckIcon, PlusIcon, TruckIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { SectionActivity, SectionTextArea } from '../components';
import { Loading } from '../components/atoms';
import Modals from '../components/atoms/Modals';
import { convertDate } from '../helpers/convertDate';
import Layout from './includes/Layout';

export default function Activity() {
  const [listDay, setlistDay] = useState({});
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const ref = useRef([]);
  const [showModal, setshowModal] = useState(false);
  const [tabActive, setTabActive] = useState(1);
  const [isLoading, setisLoading] = useState(false);

  const tabNavigation = [
    {
      id: 1,
      name: 'To Do',
      icon: TruckIcon,
    },
    {
      id: 2,
      name: 'Completed',
      icon: BadgeCheckIcon,
    },
  ];

  const handlerSetTabActive = (item) => {
    setTabActive(item.id);
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 200);
  };

  // const [elRefs, setElRefs] = useState([]);

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
      date: convertDate('tanggalHari'),
      totalUpdate: 4,
      progress: 100,
    },
    {
      title: 'Create Activity Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: convertDate('tanggalHari'),
      totalUpdate: 3,
      progress: 73,
    },
    {
      title: 'Create Report Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: convertDate('tanggalHari'),
      progress: 0,
    },
    {
      title: 'Create Dashboard Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: convertDate('tanggalHari'),
      progress: 0,
    },
    {
      title: 'Create Summary Page',
      desc: 'Membuat halaman home beserta section sectionnya',
      date: convertDate('tanggalHari'),
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
    let node = ReactDOM.findDOMNode(ref.current);
    node.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="relative mx-4 mt-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-zinc-500 text-lg">Today</p>

            <h1 className="text-zinc-800 text-2xl font-bold">
              {convertDate('namaHari')}, {convertDate('tanggal')}{' '}
              {convertDate('namaBulan')}
            </h1>
          </div>
          <button
            onClick={() => setshowModal(true)}
            className="h-10 w-10 rounded-lg bg-blue-600 flex justify-center items-center shadow shadow-blue-500/50">
            <PlusIcon className="h-6 text-white" />
          </button>
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
                  ? 'bg-blue-500 shadow-blue-500/50 font-semibold text-white'
                  : 'bg-zinc-200 text-zinc-500 font-medium',
              ].join(' ')}>
              {item}
            </div>
          ))}
      </div>

      <hr className="mx-4 mt-4" />

      <div className="relative my-4">
        <h1 className="text-zinc-800 font-semibold px-4 mb-4">List Activity</h1>
        <div className="relative flex overflow-x-scroll hidden-scroll space-x-4 pl-4 border-b-2 border-zinc-100 pb-2">
          {tabNavigation.map((item, index) => (
            <div
              key={index}
              onClick={() => handlerSetTabActive(item)}
              className={[
                'flex flex-none w-fit px-4 py-1 rounded-md font-medium text-sm justify-center items-center',
                tabActive === item.id
                  ? 'bg-blue-600 shadow-md shadow-blue-500/50 text-white font-semibold'
                  : 'bg-zinc-200 text-zinc-400 font-medium',
              ].join(' ')}>
              {item.name}
            </div>
          ))}
        </div>

        <div className="relative p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loading height={7} width={7} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 min-h-full max-h-fit transition-all duration-300 ease-in-out">
              {dataActivity
                .filter((item) =>
                  tabActive === 1 ? item.progress <= 99 : item.progress === 100,
                )
                .map((item) => (
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
          )}
        </div>
      </div>

      <Modals
        margin={false}
        moreClass="mx-4 rounded-xl"
        handlerClose={setshowModal}
        open={showModal}
        title={'Add Activity'}>
        <div className="relative">
          <div className="w-full hidden">
            <label
              htmlFor="first-name"
              className="block text-left font-medium text-gray-600">
              Activity
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
              />
            </div>
          </div>

          <SectionTextArea showTitle={true} buttonName="Add Activity" />
        </div>
      </Modals>
    </Layout>
  );
}
