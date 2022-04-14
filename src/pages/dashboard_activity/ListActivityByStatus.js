import { ArrowNarrowLeftIcon, SearchIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SectionActivity } from '../../components';
import { SectionHeaderPage, SkeletonTask } from '../../components/molecules';
import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import { convertDate } from '../../helpers/convertDate';
import Layout from '../includes/Layout';

export default function ListActivityByStatus() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const ACTIVITY = useSelector((state) => state.activity);

  const fetchData = async () => {
    setHeader();
    setisLoading(true);
    let dataAct = [];
    return await iota
      .activity({
        params: {
          regional_id: ACTIVITY?.dataStatus?.regional_id,
          date:
            ACTIVITY?.dataStatus?.type === 'pending'
              ? null
              : ACTIVITY?.dataStatus?.date,
        },
      })
      .then((res) => {
        if (ACTIVITY?.dataStatus?.type === 'pending') {
          res?.data?.map((pending) =>
            pending.activity
              .filter(
                (item) =>
                  item.progress < 100 &&
                  convertDate('tanggalFormat', item.created_at) !==
                    convertDate('tanggalFormat'),
              )
              .map((list) => dataAct.push(list)),
          );

          setdata(dataAct);
        } else if (ACTIVITY?.dataStatus?.type === 'todo') {
          res?.data?.map((todo) =>
            todo.activity
              .filter((item) => item.progress < 100)
              .map((list) => dataAct.push(list)),
          );
          setdata(dataAct);
        } else if (ACTIVITY?.dataStatus?.type === 'completed') {
          res?.data?.map((complete) =>
            complete.activity
              .filter((item) => item.progress === 100)
              .map((list) => dataAct.push(list)),
          );
          setdata(dataAct);
        }
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);

        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout showBottomBar={false}>
      {/* Section Header */}
      <div className="relative mx-4 my-4 flex justify-between">
        <div
          className="relative flex items-center space-x-1"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6 to-zinc-600" />
        </div>
        {/* <h1 className="text-lg font-semibold text-zinc-800">Activity Detail</h1> */}
        <div className="relative">
          <ArrowNarrowLeftIcon className="h-6 text-white" />
        </div>
      </div>

      <div className="relative -mt-3">
        <SectionHeaderPage
          title={`${ACTIVITY?.dataStatus?.name} ${
            data.length > 1 ? 'Activities' : 'Activity'
          }`}
        />
      </div>

      <div className="relative flex justify-between items-center px-4 mt-3">
        <p className="text-sm font-medium text-zinc-400">
          Result : <span>{ACTIVITY?.dataStatus?.value} </span>
        </p>
      </div>

      {isLoading ? (
        <SkeletonTask />
      ) : (
        <div className="relative p-4 grid grid-cols-1 gap-4 ">
          {data?.length > 0 ? (
            data?.map((item) => (
              <SectionActivity
                key={item.id}
                date={item.created_at}
                title={item.title}
                desc={item.description}
                idActivity={item.id}
                progress={item.progress}
                totalUpdate={item.progress_detail}
              />
            ))
          ) : (
            <div className="flex justify-center items-center p-4 text-sm font-medium text-zinc-500">
              Tidak ada data
            </div>
          )}
        </div>
      )}

      <div className=" relative mt-4 px-4 hidden">
        <SearchIcon className="h-6 w-6 text-zinc-200 absolute left-8 top-2" />
        <input
          type="text"
          autoComplete={'off'}
          name="search"
          placeholder="Cari Karyawan"
          className="text-zinc-800 focus:ring-blue-600 focus:border-sky-500 block w-full  border-zinc-200 rounded-md py-2 placeholder-opacity-50 placeholder-gray-500 pl-12"
        />
      </div>
    </Layout>
  );
}
