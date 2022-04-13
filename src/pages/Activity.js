import { BadgeCheckIcon, PlusIcon, TruckIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { SectionActivity, SectionTextArea } from '../components';
import { Loading } from '../components/atoms';
import Modals from '../components/atoms/Modals';
import { SectionDateHor, SkeletonTask } from '../components/molecules';
import { convertDate } from '../helpers/convertDate';
import {
  fetchActivityDoneByUser,
  fetchActivityProgressByUser,
  insertActivity,
  setTempAct,
} from '../redux/actions/activity';
import Layout from './includes/Layout';

export default function Activity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const USER = useSelector((state) => state.user);
  const ACTIVITY = useSelector((state) => state.activity);
  const [showModal, setshowModal] = useState(false);
  const [tabActive, setTabActive] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [date, setdate] = useState(convertDate('tanggalFormat'));

  const tabNavigation = [
    {
      id: 1,
      name: 'To do',
      status: 'progress',
      icon: TruckIcon,
    },
    {
      id: 2,
      name: 'Completed',
      status: 'done',

      icon: BadgeCheckIcon,
    },
  ];

  const [form, setform] = useState({
    title: '',
    description: '',
    user_id: USER?.profile?.id,
  });

  const handlerChangInput = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmitAddActivity = async (event) => {
    setisLoading(true);
    event.preventDefault();
    return dispatch(insertActivity(form))
      .then((res) => {
        if (res.status === 200) {
          swal(
            'Yeay!',
            res?.data?.message ?? 'Activity berhasil dibuat',
            'success',
          );
          form.description = '';
          form.title = '';

          dispatch(
            fetchActivityProgressByUser({
              user_id: USER?.profile?.id,
              date: convertDate('tanggalFormat'),
            }),
          );

          dispatch(
            fetchActivityDoneByUser({
              user_id: USER?.profile?.id,
              date: convertDate('tanggalFormat'),
            }),
          );
        } else {
          swal('Oh no!', res?.data?.message ?? 'Something Happened!', 'error');
        }

        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);

        swal('Oh no!', err?.data?.message ?? 'Something Happened!', 'error');
      });
  };

  const handlerChangeDate = async (item) => {
    dispatch(
      fetchActivityProgressByUser({
        user_id: USER?.profile?.id,
        date: item.uniq,
      }),
    );

    dispatch(
      fetchActivityDoneByUser({
        user_id: USER?.profile?.id,
        date: item.uniq,
      }),
    );
  };

  const handlerSetTabActive = (item) => {
    setTabActive(item.id);
    setisLoading(true);

    setTimeout(() => {
      setisLoading(false);
    }, 200);
  };

  useEffect(() => {
    dispatch(
      fetchActivityProgressByUser({
        user_id: USER?.profile?.id,
        date: date,
      }),
    );

    dispatch(
      fetchActivityDoneByUser({
        user_id: USER?.profile?.id,
        date: date,
      }),
    );

    if (USER?.profile?.role_id !== '1') {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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

      <SectionDateHor setDate={setdate} handlerChange={handlerChangeDate} />

      <hr className="mx-4 -mt-2" />
      <div className="relative my-4">
        <h1 className="text-zinc-800 font-semibold px-4 mb-4">List Activity</h1>
        <div className="relative flex overflow-x-scroll hidden-scroll space-x-4 pl-4 border-b-2 border-zinc-100 pb-2">
          {tabNavigation.map((item, index) => (
            <div
              key={index}
              onClick={() => handlerSetTabActive(item)}
              className={[
                'flex cursor-pointer flex-none w-fit px-4 py-2 rounded-md font-medium text-sm justify-center items-center transition-all duration-300 ease-in-out',
                tabActive === item.id
                  ? 'bg-blue-600 shadow-md shadow-blue-500/50 text-white font-semibold'
                  : 'bg-zinc-200 text-zinc-400 font-medium',
              ].join(' ')}>
              {item.name}
              <div className="text-xs ml-2 font-medium bg-white text-zinc-700 p-1 rounded-full flex justify-center items-center">
                {item.id === 1
                  ? ACTIVITY?.activitiesByUserProgress?.length
                  : ACTIVITY?.activitiesByUserDone?.length}
              </div>
            </div>
          ))}
        </div>

        {ACTIVITY?.isLoading ? (
          <div className="p-4 flex justify-center items-center">
            <Loading height={5} width={5} />
          </div>
        ) : (
          <div className="relative p-4">
            {isLoading ? (
              <SkeletonTask />
            ) : (
              <div className="grid grid-cols-1 gap-4 min-h-full max-h-fit transition-all duration-300 ease-in-out">
                {(tabActive === 1
                  ? ACTIVITY?.activitiesByUserProgress ?? []
                  : ACTIVITY?.activitiesByUserDone ?? []
                ).length > 0 ? (
                  (tabActive === 1
                    ? ACTIVITY?.activitiesByUserProgress
                    : ACTIVITY?.activitiesByUserDone
                  ).map((item) => (
                    <SectionActivity
                      handlerClick={() => dispatch(setTempAct(item))}
                      key={Math.random()}
                      idActivity={item?.id}
                      totalUpdate={item?.progress_detail}
                      date={item?.created_at}
                      desc={item?.description}
                      title={item?.title}
                      progress={item?.progress}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center p-4 text-sm text-zinc-500">
                    Tidak ada data
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <Modals
        margin={false}
        dontClose={isLoading}
        moreClass="rounded-xl"
        handlerClose={setshowModal}
        open={showModal}
        title={'Add Activity'}>
        <div className="relative">
          <SectionTextArea
            uploadPhoto={false}
            isLoading={isLoading}
            handlerChange={handlerChangInput}
            handlerSubmit={handlerSubmitAddActivity}
            valueDescription={form.description}
            valueTitle={form.title}
            showTitle={true}
            buttonName="Add"
          />
        </div>
      </Modals>
    </Layout>
  );
}
