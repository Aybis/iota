import ReactCircularSlider from '@fseehawer/react-circular-slider';
import { LogoutIcon } from '@heroicons/react/outline';
import { BadgeCheckIcon, TruckIcon } from '@heroicons/react/solid';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { SectionActivity } from '../components';
import { Loading } from '../components/atoms';
import {
  getImageFromAssets,
  imageApiAvatarUser,
} from '../helpers/assetHelpers';
import Layout from './includes/Layout';

export default function Home() {
  let arr = [];
  const USER = useSelector((state) => state.user);
  const navigate = useNavigate();
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

  Array.from({ length: 100 }).map((item, index) => arr.push(`${index}%`));

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

  const handlerLogout = () => {
    swal('Yeay!', 'Anda Berhasil Logout!', 'success');
    Cookies.remove('session');
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  useEffect(() => {
    USER?.profile?.role !== 'user' ? navigate('/absensi') : navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER]);

  return (
    <Layout>
      {/* Section Header */}
      <div className="relative flex justify-between px-4 inset-x-0 mt-6 mb-10">
        <div className="flex space-x-2">
          <img
            src={imageApiAvatarUser('aybis')}
            className="h-10 w-10 rounded-md object-cover"
            alt=""
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-zinc-400">Welcome back,</p>
            <p className="font-semibold text-sm text-zinc-800 capitalize">
              {USER?.profile?.nama ?? 'Anonymous'}
            </p>
          </div>
        </div>

        <button
          onClick={() => handlerLogout()}
          className="flex flex-col justify-center items-center">
          <LogoutIcon className="h-5 text-zinc-400" />
          <p className="text-xs text-zinc-400">Logout</p>
        </button>
      </div>

      {/* Section CTA */}
      <div className="relative m-4">
        <div className="bg-white rounded-lg flex">
          <div className="flex flex-col justify-evenly pl-4 py-2">
            <div>
              <p className="text-lg font-bold text-zinc-800">Sudahkah anda,</p>
              <p className="text-lg font-bold -mt-1 text-red-600">
                Presensi <span className="text-zinc-800">hari ini!</span>
              </p>
            </div>
            <p className="text-xs text-zinc-500">
              Budayakan disiplin absensi dari sekarang!
            </p>
          </div>
          <img
            src={getImageFromAssets('/assets/absen_ilustrasi.svg')}
            className=" -mt-4"
            style={{ height: '9.4rem' }}
            alt=""
          />
        </div>
      </div>

      <div className="relative bg-white my-8 mx-4 rounded-lg  hidden">
        <div className="flex w-full">Test</div>
        <div className="flex flex-1 w-12 ">
          <p className="">Add Task</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="relative my-8">
        <div className="px-4 mb-4">
          <h1 className="to-zinc-800 font-semibold">Activity Summary</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3 mx-4">
          <div className="flex justify-between items-center px-8 col-span-2 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-400 p-3 rounded-lg">
            <div>
              <h1 className="text-xl font-bold text-white">
                Task's progress summary
              </h1>
              <p className="mt-1 text-sm text-zinc-100 font-medium">
                20 of 32 completed
              </p>
            </div>
            <div>
              <ReactCircularSlider
                width={100}
                label=" "
                verticalOffset="0"
                labelColor="#fff"
                knobColor="#005a58"
                progressColorFrom="#fcd34d"
                progressColorTo="#f59e0b"
                progressSize={10}
                trackColor="#fffbeb"
                trackSize={5}
                valueFontSize="2rem"
                max={100}
                min={0}
                data={arr} //...
                dataIndex={(20 / 32) * 100}
                hideKnob={true}
                knobDraggable={false}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg px-4 py-3 shadow-lg shadow-amber-500/50 flex flex-col justify-between space-y-4">
            <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
              <TruckIcon className="text-amber-500 h-7" />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-zinc-50 text-sm font-medium">To do</p>
              <p className="text-2xl font-bold text-white">12 </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-lg px-4 py-3 shadow-lg shadow-teal-500/50 flex flex-col justify-between">
            <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
              <BadgeCheckIcon className="text-teal-500 h-7" />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-zinc-50 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-white">20 </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Overview Section */}
      <div className="relative my-8">
        <div className="px-4 mb-4">
          <h1 className="to-zinc-800 font-semibold">Task Overview</h1>
        </div>
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

        <div className="relative bg-gradient-to-b from-zinc-100 to-zinc-50 p-4">
          <div className="relative">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loading height={7} width={7} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 min-h-full max-h-fit transition-all duration-300 ease-in-out">
                {dataActivity
                  .filter((item) =>
                    tabActive === 1
                      ? item.progress <= 99
                      : item.progress === 100,
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
      </div>
    </Layout>
  );
}
