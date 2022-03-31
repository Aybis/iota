import {
  ArrowNarrowLeftIcon,
  BadgeCheckIcon,
  TruckIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionActivity } from '../../components';
import { Loading } from '../../components/atoms';
import { imageApi } from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import Layout from '../includes/Layout';

export default function DetailUserAct() {
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState(1);
  const [isLoading, setisLoading] = useState(false);

  const tabNavigation = [
    {
      id: 1,
      name: 'To Do',
      total: 23,
      icon: TruckIcon,
    },
    {
      id: 2,
      name: 'Completed',
      total: 50,
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
        <img src={imageApi('AMA')} alt="" className="h-24 w-24 rounded-lg" />

        <h1 className="text-zinc-800 font-semibold mt-2">
          Abdul Muchtar Astria
        </h1>
        <p className="text-zinc-500 text-sm mt-1"> IT & Management Support</p>
      </div>

      {/* Section Detail */}

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

            <small className="text-xs bg-white text-zinc-500 ml-4 rounded-full px-2 py-1">
              {item.total}
            </small>
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
              {Array.from({ length: tabActive === 1 ? 23 : 50 }).map(
                (item, index) => (
                  <SectionActivity
                    key={Math.random()}
                    title={`Activity ${index + 1}`}
                    date={convertDate('tanggalHari')}
                    totalUpdate={
                      tabActive === 1
                        ? (1 + Math.random() * (4 - 1)).toFixed(0)
                        : (1 + Math.random() * (6 - 1)).toFixed(0)
                    }
                    progress={
                      tabActive === 1
                        ? (1 + Math.random() * (99 - 1)).toFixed(0)
                        : 100
                    }
                  />
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
