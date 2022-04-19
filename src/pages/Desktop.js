import { BadgeCheckIcon, ClockIcon, TruckIcon } from '@heroicons/react/solid';
import React from 'react';
import Breadcrumbs from '../components/atoms/Breadcumbs';
import { convertDate } from '../helpers/convertDate';
import Layout from './includes/Layout';

export default function Desktop() {
  const dataDashboard = [
    {
      name: 'Pending',
      icon: <ClockIcon />,
      value: 20,
    },
    {
      name: 'Complete',
      icon: <BadgeCheckIcon />,
      value: 20,
    },
    {
      name: 'To do',
      icon: <TruckIcon />,
      value: 20,
    },
  ];

  return (
    <Layout>
      {/* Section Header */}
      <div className="relative flex justify-between ">
        <div className="relative">
          <h1 className="text-2xl font-semibold text-zinc-800">Overview</h1>
          <p className="text-sm text-zinc-500 font-light mt-1">
            {convertDate('tanggalHari')}
          </p>
        </div>

        <Breadcrumbs name={'Overview'} href="/dekstop" />
      </div>
      {/* End Section Header */}

      {/* Section Overview */}

      <div className="relative grid grid-cols-3 gap-4 mt-8">
        {dataDashboard.map((item) => (
          <div
            className="relative flex flex-col bg-white shadow-lg shadow-zinc-200/20 p-4 rounded-lg"
            key={Math.random()}>
            <div className="flex justify-center items-center p-1 h-8 w-8 rounded-full text-indigo-400">
              {item.icon}
            </div>
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
    </Layout>
  );
}
