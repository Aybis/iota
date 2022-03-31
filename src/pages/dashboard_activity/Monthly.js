import ReactCircularSlider from '@fseehawer/react-circular-slider';
import { BadgeCheckIcon, TruckIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { SectionFilterMonthYear } from '../../components/molecules';
import { convertDate } from '../../helpers/convertDate';

export default function Monthly() {
  let arr = [];
  const [temporary, setTemporary] = useState({
    month: convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      setTemporary({
        month: event.target.value,
        year: temporary.year,
      });
    }

    if (event.target.name === 'year') {
      setTemporary({
        month: temporary.month,
        year: event.target.value,
      });
    }
  };
  Array.from({ length: 100 }).map((item, index) => arr.push(`${index}%`));

  return (
    <div className="relative my-8">
      <div className="lg:container lg:mx-auto flex justify-center items-center relative -mt-6 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 mx-4 ">
        <div className="flex justify-between items-center px-8 col-span-2 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-400 p-3 rounded-lg">
          <div>
            <h1 className="text-xl font-bold text-white">
              Task's progress summary
            </h1>
            <p className="mt-1 text-sm text-zinc-100 font-medium">
              470 of 672 completed
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
              dataIndex={(470 / 672) * 100}
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
            <p className="text-2xl font-bold text-white">202 </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-lg px-4 py-3 shadow-lg shadow-teal-500/50 flex flex-col justify-between">
          <div className="flex justify-center items-center bg-white h-10 p-2 w-10 rounded-full">
            <BadgeCheckIcon className="text-teal-500 h-7" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-zinc-50 text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold text-white">470 </p>
          </div>
        </div>
      </div>
    </div>
  );
}