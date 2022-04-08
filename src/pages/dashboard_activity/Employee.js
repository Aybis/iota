import {
  ArrowNarrowUpIcon,
  DownloadIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SectionFilterMonthYear } from '../../components/molecules';
import { imageApiAvatarUser } from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import {
  fetchAllActivity,
  setDataSelectedAct,
  setMonthAct,
  setYearAct,
} from '../../redux/actions/activity';

export default function Employee() {
  const [visible, setVisible] = useState(false);

  const [temporary, setTemporary] = useState({
    month:
      convertDate('bulan') < 10
        ? `0${convertDate('bulan')}`
        : convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const ACTIVITY = useSelector((state) => state.activity);
  const REGIONAL = useSelector((state) => state.regional);
  const [searchName, setsearchName] = useState('');
  const [loading, setloading] = useState(false);
  const [dataFilter, setdataFilter] = useState(ACTIVITY?.dashboardActEmployee);

  const USER = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      setTemporary({
        month: event.target.value,
        year: temporary.year,
      });

      dispatch(setMonthAct(event.target.value));
    }

    if (event.target.name === 'year') {
      setTemporary({
        month: temporary.month,
        year: event.target.value,
      });
      dispatch(setYearAct(event.target.value));
    }
  };

  const handlerClickDetail = (item) => {
    dispatch(setDataSelectedAct(item));
    navigate(`/activities/${item.name}`);
  };

  const handlerSearchEmployee = (event) => {
    setloading(true);
    setsearchName(event.target.value);
    let result = ACTIVITY?.dashboardActEmployee?.filter(
      (item) => item?.name?.toLowerCase().search(event.target.value) !== -1,
    );
    setdataFilter(result);
    setTimeout(() => {
      setloading(false);
    }, 400);
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const handlerButtonToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  useEffect(() => {
    dispatch(setMonthAct(temporary.month));
    dispatch(setYearAct(temporary.year));
    dispatch(
      fetchAllActivity({
        regional_id:
          USER?.profile?.rregional_id === null
            ? REGIONAL?.selected?.id
            : USER?.profile?.regional_id,
        date: `${temporary.year}-${temporary.month}`,
      }),
    );

    setdataFilter(ACTIVITY?.dashboardActEmployee);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="relative my-8 mx-4">
      {visible && (
        <div
          onClick={() => handlerButtonToUp()}
          className="fixed right-10  z-20 bottom-20 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out">
          <ArrowNarrowUpIcon className="h-5 lg:h-10 text-white" />
        </div>
      )}

      <div className="lg:container lg:mx-auto flex justify-center items-center relative -mt-6 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <p className="text-sm text-zinc-500 font-medium">
          Result : {dataFilter?.length}
        </p>
        <div className="flex space-x-1 justify-center items-center text-sm font-medium text-zinc-500">
          <DownloadIcon className="h-4" />
          <p>Download</p>
        </div>
      </div>

      <div>
        <div>
          <div className=" my-6 sticky top-0">
            <SearchIcon className="h-6 w-6 text-zinc-200 absolute left-4 top-3" />
            <input
              type="text"
              autoComplete={'off'}
              name="search"
              placeholder="Cari Karyawan"
              value={searchName}
              onChange={(event) => handlerSearchEmployee(event)}
              className="px-4 py-2 text-lg text-zinc-800 focus:ring-blue-600 focus:border-sky-500 block w-full border-transparent rounded-lg shadow-lg shadow-zinc-200/40 placeholder-opacity-50 placeholder-gray-500 pl-12"
            />
          </div>
          <div className="relative grid grid-cols-1 gap-y-5 mt-4">
            {loading || ACTIVITY?.isLoading ? (
              <div className="p-3 rounded-xl bg-white shadow-lg flex space-x-2">
                <div className="h-24 w-24 flex rounded-lg bg-zinc-200 animate-pulse"></div>
                <div className="flex flex-col w-full space-y-1">
                  <div className="h-4 w-full bg-zinc-200 animate-pulse rounded-lg"></div>
                  <div className="h-4 w-full bg-zinc-200 animate-pulse rounded-lg"></div>
                  <div className="h-16 w-full bg-zinc-200 animate-pulse rounded-lg"></div>
                </div>
              </div>
            ) : (
              dataFilter?.map((item, index) => (
                <div
                  key={index}
                  // to={`/activities/${item.user_id}`}
                  onClick={() => handlerClickDetail(item)}
                  className="flex flex-col justify-center bg-white shadow-lg shadow-zinc-200/50 rounded-lg p-3">
                  <div className="flex space-x-3">
                    <img
                      src={imageApiAvatarUser(item?.name)}
                      className="h-24 w-24 rounded-lg"
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <p className="text-xs font-semibold text-zinc-800">
                        {item?.name}
                      </p>
                      <p className="text-xs font-medium text-zinc-500 my-1">
                        {item?.posisi} - {item?.witel}
                      </p>
                      <div className="flex justify-around bg-zinc-100 px-2 py-1 w-full rounded-md mt-2">
                        <div className="flex flex-col space-y-1">
                          <h1 className="text-xs font-medium text-zinc-400">
                            To Do
                          </h1>
                          <span className="font-semibold text-zinc-800 text-lg">
                            {item?.todo?.length}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <h1 className="text-xs font-medium text-zinc-400">
                            Progress
                          </h1>
                          <span className="font-semibold text-zinc-800">
                            {item?.progress?.length}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <h1 className="text-xs font-medium text-zinc-400">
                            Complete
                          </h1>
                          <span className="font-semibold text-zinc-800 text-lg">
                            {item?.done?.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
