import {
  ArrowNarrowLeftIcon,
  BadgeCheckIcon,
  ExclamationIcon,
  TruckIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SectionActivity } from '../../components';
import { SkeletonTask } from '../../components/molecules';
import { imageApi } from '../../helpers/assetHelpers';
import Layout from '../includes/Layout';

export default function DetailUserAct() {
  const ACTIVITY = useSelector((state) => state.activity);
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [dataActivity, setdataActivity] = useState(
    ACTIVITY?.selectedActivities?.todo,
  );

  const tabNavigation = [
    {
      id: 1,
      name: 'To Do',
      title: 'todo',
      total: 30,
      icon: ExclamationIcon,
    },
    {
      id: 2,
      name: 'Progress',
      title: 'progress',
      total: 23,
      icon: TruckIcon,
    },
    {
      id: 3,
      name: 'Completed',
      total: 50,
      title: 'done',
      icon: BadgeCheckIcon,
    },
  ];

  const handlerSetTabActive = (item) => {
    setTabActive(item.id);
    setisLoading(true);
    if (item.id === 1) {
      setdataActivity(ACTIVITY?.selectedActivities?.todo);
    } else if (item.id === 2) {
      setdataActivity(ACTIVITY?.selectedActivities?.progress);
    } else if (item.id === 3) {
      setdataActivity(ACTIVITY?.selectedActivities?.done);
    }
    setTimeout(() => {
      setisLoading(false);
    }, 200);
  };

  return (
    <Layout showBottomBar={false}>
      {/* Section Header */}
      <div className="relative mx-4 my-4 flex justify-between">
        <div
          className="relative flex items-center space-x-1"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6 to-zinc-600" />
          <p className="text-xs font-medium text-zinc-600">Kembali</p>
        </div>
        {/* <h1 className="text-lg font-semibold text-zinc-800">Activity Detail</h1> */}
        <div className="relative">
          <ArrowNarrowLeftIcon className="h-6 text-white" />
        </div>
      </div>

      <div className="relative flex flex-col justify-center items-center m-4 mb-10">
        <img
          src={imageApi(ACTIVITY?.selectedActivities?.name)}
          alt=""
          className="h-24 w-24 rounded-lg"
        />

        <h1 className="text-zinc-800 font-semibold mt-2 capitalize">
          {ACTIVITY?.selectedActivities?.name?.toLowerCase()}
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {' '}
          {ACTIVITY?.selectedActivities?.posisi}
        </p>
      </div>

      {/* Section Detail */}

      <div className="relative flex overflow-x-scroll hidden-scroll space-x-4 px-4 border-b-2 border-zinc-100 pb-2">
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

            <small className="text-xs bg-white text-zinc-500 ml-4 rounded-full px-2 py-1">
              {item.id === 1 && ACTIVITY?.selectedActivities?.todo?.length}
              {item.id === 2 && ACTIVITY?.selectedActivities?.progress?.length}
              {item.id === 3 && ACTIVITY?.selectedActivities?.done?.length}
            </small>
          </div>
        ))}
      </div>

      <div className="relative bg-gradient-to-b from-zinc-100 to-zinc-50 p-4">
        <div className="relative">
          {isLoading ? (
            <SkeletonTask />
          ) : (
            <div className="grid grid-cols-1 gap-4 min-h-full max-h-fit transition-all duration-300 ease-in-out">
              {dataActivity?.length > 0 ? (
                dataActivity?.map((item, index) => (
                  <SectionActivity
                    key={Math.random()}
                    date={item.created_at}
                    desc={item.description}
                    progress={item.progress}
                    title={item.title}
                    idActivity={item.id}
                    totalUpdate={item?.progress_detail}
                  />
                ))
              ) : (
                <div className="text-sm flex justify-center items-center">
                  Tidak ada data
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
