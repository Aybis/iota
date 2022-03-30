import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { Slider } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHistoryActivity, SectionTextArea } from '../components';
import Layout from './includes/Layout';

export default function DetailActivity() {
  const navigate = useNavigate();
  const [range, setrange] = useState(0);

  const handlerChange = (event) => {
    setrange(event.target.value);
  };

  return (
    <Layout showBottomBar={false}>
      {/* Section Header */}
      <div className="relative mx-4 my-4 flex justify-between">
        <div className="relative" onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
        </div>
        <h1 className="text-lg font-semibold text-zinc-800">Activity Detail</h1>
        <div className="relative">
          <ArrowNarrowLeftIcon className="h-6 text-white" />
        </div>
      </div>

      {/* Section Detail */}

      <div className="relative mx-4 my-8">
        <p className="font-semibold text-zinc-800">Update Progress Activity</p>
        <div className="relative mt-3 bg-white p-4 rounded-lg shadow-lg shadow-zinc-200/30">
          <label htmlFor="" className="text-zinc-700 font-semibold">
            Create Homepage
          </label>
          <div className="flex space-x-6 items-center px-1">
            <Slider
              onChange={(e) => handlerChange(e)}
              value={range}
              aria-label="Progress"
              valueLabelDisplay="auto"
            />
            <p className="text-sm text-zinc-400 font-medium">{range}%</p>
          </div>
          <SectionTextArea />
        </div>
      </div>

      <div className="relative my-8 mx-4">
        <p className="text-sm font-semibold text-zinc-800 mb-4">
          History Activity
        </p>

        <div className="relative">
          <div className="grid grid-cols-1 gap-4 ">
            <SectionHistoryActivity />
          </div>
        </div>
      </div>
    </Layout>
  );
}
