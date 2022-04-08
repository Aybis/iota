import { BadgeCheckIcon, PlusIcon, TruckIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { SectionActivity, SectionTextArea } from '../components';
import { Loading } from '../components/atoms';
import Modals from '../components/atoms/Modals';
import { convertDate } from '../helpers/convertDate';
import {
  fetchActivityDoneByUser,
  fetchActivityProgressByUser,
  insertActivity,
  setTempAct,
} from '../redux/actions/activity';
import Layout from './includes/Layout';

export default function Activity() {
  const [listDay, setlistDay] = useState({});
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.user);
  const ACTIVITY = useSelector((state) => state.activity);
  const year = new Date().getFullYear();
  const [scrollLeftPosition, setscrollLeftPosition] = useState(0);
  const [scrollRef, setscrollRef] = useState(useRef(null));
  const [activeRef, setactiveRef] = useState(useRef('active'));
  const month = new Date().getMonth();
  const [showModal, setshowModal] = useState(false);
  const [tabActive, setTabActive] = useState(1);
  const [isLoading, setisLoading] = useState(false);

  const tabNavigation = [
    {
      id: 1,
      name: 'To Do',
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

  const [dayNow, setdayNow] = useState(
    new Date().toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
    }),
  );

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
    event.preventDefault();
    return dispatch(insertActivity(form))
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          swal(
            'Yeay!',
            res?.data?.message ?? 'Activity berhasil dibuat',
            'success',
          );
        } else {
          swal('Oh no!', res?.data?.message ?? 'Something Happened!', 'error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerSetTabActive = (item) => {
    setTabActive(item.id);
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 200);
  };

  const getAllDaysInMonth = (month, year) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() }, // get next month, zeroth's (previous) day
      (_, i) => new Date(year, month - 1, i + 1), // get current month (0 based index)
    );

  // const handlerClick = (item) => {
  //   console.log(item);
  //   setdayNow(item);
  // };

  const centerActiveItem = () => {
    const scrollContainer = ReactDOM.findDOMNode(scrollRef);
    const activeItem = ReactDOM.findDOMNode(activeRef);

    if (!activeItem) {
      return;
    }

    const scrollRect = scrollContainer.getBoundingClientRect();
    const activeRect = activeItem.getBoundingClientRect();
    // const activeWidth = activeRect.width;
    // const activeLeft = activeRect.left;
    // const activeRight = activeRect.right;
    // const scrollWidth = scrollContainer.scrollWidth;
    // const scrollLeft = scrollRect.left;

    setscrollLeftPosition(
      activeRect.left -
        scrollRect.left -
        scrollRect.width / 2 +
        activeRect.width / 2,
    );

    console.log('active', activeRect, scrollRect, scrollLeftPosition);

    // scrollContainer.scrollTo({
    //   left: (scrollContainer.scrollLeft += scrollLeftPosition),
    //   behavior: 'smooth',
    // });

    if (scrollContainer) {
      scrollContainer.scrollLeft += scrollLeftPosition;
    }
  };

  const toggleItem = (currentItem) => {
    setdayNow(currentItem);
    centerActiveItem();
  };

  const clickHandler = (event, currentItem) => {
    toggleItem(currentItem);
  };

  useEffect(() => {
    const result = getAllDaysInMonth(month + 1, year).map((x) => {
      return x.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
      });
    });

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

    setlistDay(result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div
        className="relative flex space-x-2 overflow-x-auto hidden-scroll px-4 mt-8 scroll-smooth w-full"
        ref={(ref) => setscrollRef(ref)}>
        {listDay.length > 0 &&
          listDay?.map((item, index) => (
            <div
              ref={(ref) => {
                if (dayNow === item) {
                  setactiveRef(ref);
                }
              }}
              key={index}
              onClick={(e) => clickHandler(e, item)}
              className={[
                'flex flex-col rounded-lg text-center justify-center items-center flex-none w-14 px-4 py-2 text-sm  transition-all duration-300 ease-in-out',
                dayNow === item
                  ? 'bg-blue-500 shadow-blue-500/50 font-semibold text-white active'
                  : 'bg-zinc-200 text-zinc-500 font-medium',
              ].join(' ')}>
              {item.replace(',', `\n\n`)}
            </div>
          ))}
      </div>

      <hr className="mx-4 mt-4" />

      <div className="relative my-4">
        <h1 className="text-zinc-800 font-semibold px-4 mb-4">List Activity</h1>
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

        <div className="relative p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loading height={7} width={7} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 min-h-full max-h-fit transition-all duration-300 ease-in-out">
              {(tabActive === 1
                ? ACTIVITY?.activitiesByUserProgress
                : ACTIVITY?.activitiesByUserDone
              ).map((item) => {
                return item.id ? (
                  <SectionActivity
                    handlerClick={() => dispatch(setTempAct(item))}
                    key={Math.random()}
                    idActivity={item?.id}
                    totalUpdate={item?.totalUpdate}
                    date={item?.created_at}
                    desc={item?.description}
                    title={item?.title}
                    progress={item?.progress}
                  />
                ) : (
                  <div className="flex justify-center items-center p-4 bg-white rounded-lg">
                    Tidak ada data
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Modals
        margin={false}
        moreClass="rounded-xl"
        handlerClose={setshowModal}
        open={showModal}
        title={'Tambah Activity'}>
        <div className="relative">
          <SectionTextArea
            handlerChange={handlerChangInput}
            handlerSubmit={handlerSubmitAddActivity}
            valueDescription={form.description}
            valueTitle={form.title}
            showTitle={true}
            buttonName="Tambah"
          />
        </div>
      </Modals>
    </Layout>
  );
}
