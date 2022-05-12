import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeaderPage } from '../../../components/molecules';
import { setHeader } from '../../../config/api/constant';
import iota from '../../../config/api/route/iota';
import { imageApi } from '../../../helpers/assetHelpers';
import Layout from '../../includes/Layout';

export default function Index() {
  const navigate = useNavigate();
  const [dataUsers, setdataUsers] = useState([]);

  const fetchData = async () => {
    setHeader();
    return await iota
      .fetchAllUsers()
      .then((res) => {
        setdataUsers(res.data);
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout showBottomBar={false}>
      <SectionHeaderPage title={'Manage Data Teknisi'} />
      {/* Section Header */}
      <div className="relative my-4 px-4 lg:-mt-2 lg:px-0 flex items-center justify-between">
        <div
          className="relative cursor-pointer hover:scale-110 rounded-lg transition-all duration-300 ease-out text-zinc-600"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
        </div>
      </div>

      <div className="relative my-4">
        <p className="text-lg font-semibold text-zinc-700">List Data Teknisi</p>
        <p className="mt-3 text-sm text-zinc-400">
          Result : <span>{dataUsers?.length ?? 0} Teknisi</span>
        </p>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {dataUsers?.length > 0 ? (
          dataUsers?.map((item) => (
            <div
              key={Math.random()}
              className=" bg-white p-4 relative flex flex-col justify-center items-center space-y-4 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-zinc-200/40 md:cursor-pointer rounded-lg">
              <img
                src={imageApi(item.name)}
                alt=""
                className="h-20 w-20 rounded-lg"
              />
              <div className="relative">
                <p className="text-center capitalize text-sm text-zinc-700 font-semibold">
                  {item.name?.toLowerCase()}
                </p>
                <p className="text-center text-xs mt-1 text-zinc-400 capitalize">
                  {item.witel}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-2 md:col-span-3 lg:col-span-4">
            <p className="font-medium text-zinc-500">Tidak ada data</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
