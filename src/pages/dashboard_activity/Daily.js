import ReactCircularSlider from '@fseehawer/react-circular-slider';
import { BadgeCheckIcon, TruckIcon } from '@heroicons/react/solid';
import React from 'react';

export default function Daily() {
  let arr = [];
  Array.from({ length: 100 }).map((item, index) => arr.push(`${index}%`));

  return (
    <div className="relative my-8">
      <div className="grid grid-cols-2 gap-4 mt-3 mx-4">
        <div className="flex justify-between items-center px-8 col-span-2 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-400 p-3 rounded-lg">
          <div>
            <h1 className="text-xl font-bold text-white">
              Task's progress summary
            </h1>
            <p className="mt-1 text-sm text-zinc-100 font-medium">
              76 of 138 completed
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
              dataIndex={(76 / 138) * 100}
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
            <p className="text-2xl font-bold text-white">62 </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-lg px-4 py-3 shadow-lg shadow-teal-500/50 flex flex-col justify-between">
          <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
            <BadgeCheckIcon className="text-teal-500 h-7" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-zinc-50 text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold text-white">76 </p>
          </div>
        </div>
        <div className="flex items-center space-x-5 p-4 col-span-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
          <div className="bg-white rounded-xl p-4 text-3xl font-bold text-red-500">
            <p>120</p>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Pending activity</h1>
            <p className="mt-1 text-sm text-zinc-100 text-opacity-70 font-medium">
              hingga saat ini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
