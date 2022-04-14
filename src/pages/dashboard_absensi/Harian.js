import { ChatAlt2Icon, SearchIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {
  Loading,
  Modals,
  TableBody,
  TableContent,
  TableHeading,
} from '../../components/atoms';
import {
  ChartDoughnut,
  ChartGauge,
  Pagination,
  SectionSummary,
} from '../../components/molecules';
import { titleCard } from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import {
  fetchDashboardHarian,
  sendNotifReminder,
} from '../../redux/actions/dashboardadmin';

export default function Harian() {
  const dispatch = useDispatch();
  const DASHBOARD = useSelector((state) => state.dashboardadmin);
  const USER = useSelector((state) => state.user);
  const [showModalUser, setshowModalUser] = useState(false);
  const [dataSelected, setdataSelected] = useState(null);
  const [totalUsers, settotalUsers] = useState([]);
  const [loading, setloading] = useState(false);

  const [search, setsearch] = useState('');

  const [loadingUser, setLoadingUser] = useState({
    user_id: '',
    isLoading: false,
  });

  const [state, setstate] = useState({
    allUsers: dataSelected?.users,
    currentUsers: [],
    currentPage: null,
    totalPages: null,
  });

  const onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = dataSelected?.users.slice(offset, offset + pageLimit);
    setstate({ currentPage, currentUsers, totalPages });
  };

  const handlerClickData = (item) => {
    settotalUsers(item.users);
    setsearch('');
    setshowModalUser(true);
    setdataSelected(item);
  };

  // function handler click notif wa ke karyawan
  const handlerReminderKaryawan = (item) => {
    setLoadingUser({
      user_id: item.id,
      isLoading: true,
    });

    sendNotifReminder({
      id: 134,
      nama_atasan: 'HR',
    })
      .then((res) => {
        if (res.status === 200) {
          setLoadingUser({
            user_id: item.id,
            isLoading: false,
          });
          console.log(res, 'depan');
          swal('Yeay!', res.message, 'success');
        } else {
          setLoadingUser({
            user_id: item.id,
            isLoading: false,
          });
          swal('Oh Nooo!', 'Something Happened!', 'error');
        }
      })
      .catch((err) => {
        setLoadingUser({
          user_id: item.id,
          isLoading: false,
        });
        swal('Oh Nooo!', 'Something Happened!', 'error');
      });
  };

  // function input search
  const handlerChange = (event) => {
    setloading(true);

    setsearch(event.target.value);
    let result = totalUsers.filter(
      (item) =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1,
    );
    setdataSelected({
      ...dataSelected,
      users: result,
    });
    setTimeout(() => {
      setloading(false);
    }, 50);
  };

  useEffect(() => {
    dispatch(
      fetchDashboardHarian(
        USER?.profile?.regional_id === ''
          ? DASHBOARD?.regionalSelected?.id
          : USER?.profile?.regional_id,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="relative my-8 mx-4">
      <h1 className="text-sm font-semibold text-zinc-700">
        {convertDate('tanggalHari')}
      </h1>
      <div className="relative mt-4 mb-6 lg:px-0 container mx-auto max-w-7xl">
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 gap-y-3 divide-x divide-zinc-100 bg-white rounded-md p-2">
          {DASHBOARD?.reportKehadiran?.length > 0 &&
            DASHBOARD?.reportKehadiran
              ?.filter(
                (item) =>
                  item.name !== 'Tidak Checkout' && item.name !== 'Tidak Absen',
              )
              .map((item) => (
                <div
                  onClick={() => handlerClickData(item)}
                  key={Math.random()}
                  className="relative pl-2">
                  <h4 className="text-zinc-500 font-normal text-xs lg:text-sm">
                    {item.name === 'Hadir'
                      ? 'Presence'
                      : item.name === 'Terlambat'
                      ? 'Late'
                      : item.name === 'Keterangan'
                      ? 'Explanation'
                      : item.name === 'Belum Absen'
                      ? 'Not Absence'
                      : ''}
                  </h4>
                  <h1 className="text-zinc-900 font-bold text-xl mt-3">
                    {item.value}
                  </h1>
                </div>
              ))}
        </div>
      </div>

      {/* ================ */}
      <h1 className="text-zinc-800 font-semibold">Summary</h1>

      {DASHBOARD?.isLoading ? (
        <div className="flex justify-center items-center col-span-2 lg:col-span-4">
          <Loading height={6} width={6} color={'text-blue-500'} />
        </div>
      ) : (
        <div className="relative my-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:px-0 container mx-auto max-w-7xl">
          {DASHBOARD?.reportKeterangan?.length > 0 &&
            DASHBOARD?.reportKeterangan?.map((item) => (
              <SectionSummary
                key={Math.random()}
                type="employee"
                data={item}
                handlerClick={() => handlerClickData(item)}
                isEvent={true}
              />
            ))}
        </div>
      )}

      {/* Chart  */}
      <div className="relative my-8 lg:px-0 container mx-auto max-w-7xl">
        <h1 className="text-zinc-900 font-semibold lg:text-lg">Performance</h1>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
          <div className="bg-white rounded-md p-4">
            {DASHBOARD?.isLoading ? (
              <div className="flex justify-center items-center">
                <Loading height={6} width={6} color={'text-blue-500'} />
              </div>
            ) : (
              DASHBOARD?.reportKeterangan && (
                <ChartDoughnut
                  dataChart={DASHBOARD?.reportKeterangan}
                  type={'emp'}
                  title={'Attendance Explanation'}
                />
              )
            )}
          </div>
          <div className="bg-white rounded-md p-4">
            {DASHBOARD?.isLoading ? (
              <div className="flex justify-center items-center">
                <Loading height={6} width={6} color={'text-blue-500'} />
              </div>
            ) : (
              <ChartGauge
                dataChart={DASHBOARD?.reportKehadiran?.filter(
                  (item) =>
                    item.name === 'Hadir' || item.name === 'Belum Absen',
                )}
                title={'Attendance'}
                type="emp"
                isNegative={true}
              />
            )}
          </div>
        </div>
      </div>

      <Modals
        open={showModalUser}
        dontClose={true}
        margin={false}
        handlerClose={setshowModalUser}
        title={`List Employee ${titleCard(dataSelected?.name)}`}>
        <div className="w-full -mt-2 lg:w-4xl overflow-x-auto hidden-scroll">
          {totalUsers.length > 0 && (
            <div className="flex relative mt-12">
              <SearchIcon className="h-6 w-6 text-zinc-200 absolute left-4 top-2" />
              <input
                type="text"
                autoComplete={'off'}
                name="search"
                placeholder="Cari Karyawan"
                value={search}
                onChange={(event) => handlerChange(event)}
                className="text-zinc-800 focus:ring-blue-600 focus:border-sky-500 block w-full  border-zinc-200 rounded-md py-2 placeholder-opacity-50 placeholder-gray-500 pl-12"
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <TableHeading
              addClassTable={'p-2 mt-4 w-xl'}
              theading={[
                'No',
                'name',
                'regional',
                dataSelected?.name === 'Belum Absen' ? 'action' : ' ',
              ]}>
              {state.currentUsers.map((item, index) => (
                <TableBody addClass={'p-4'} key={Math.random()} index={index}>
                  <TableContent>{index + 1}</TableContent>
                  <TableContent addClassChild={'capitalize whitespace-nowrap'}>
                    {item.name.toLowerCase()}
                  </TableContent>
                  <TableContent addClassChild={'capitalize whitespace-nowrap'}>
                    {item.witel.toLowerCase()}
                  </TableContent>
                  {dataSelected?.name === 'Belum Absen' ? (
                    <TableContent>
                      <button
                        onClick={() => handlerReminderKaryawan(item)}
                        disabled={
                          loadingUser?.isLoading &&
                          item.id === loadingUser?.user_id
                        }
                        className="disabled:opacity-50 bg-blue-600 text-sm gap-2 shadow-md shadow-blue-500/50 text-white font-semibold flex items-center justify-center px-4 py-2 rounded-md">
                        <span>
                          {loadingUser?.isLoading &&
                          item.id === loadingUser?.user_id ? (
                            <Loading
                              color={'text-white'}
                              height={4}
                              width={4}
                            />
                          ) : (
                            <ChatAlt2Icon className="h-4" />
                          )}
                        </span>
                        Remind
                      </button>
                    </TableContent>
                  ) : (
                    <TableContent />
                  )}
                </TableBody>
              ))}
            </TableHeading>
          </div>

          {loading ? (
            ''
          ) : (
            <div className="flex justify-between items-center mt-4">
              {dataSelected?.users?.length > 0 ? (
                state.currentPage && (
                  <span className="text-xs lg:text-base current-page d-inline-block h-100 pl-4 text-gray-400">
                    Page{' '}
                    <span className="ml-1 font-semibold text-gray-800">
                      {state.currentPage}
                    </span>{' '}
                    /{' '}
                    <span className="font-semibold text-gray-600">
                      {state.totalPages}
                    </span>
                  </span>
                )
              ) : (
                <p className="text-center w-full">No data</p>
              )}
              <Pagination
                totalRecords={dataSelected?.users?.length ?? 0}
                pageLimit={10}
                pageNeighbours={1}
                onPageChanged={onPageChanged}
              />
            </div>
          )}
        </div>
      </Modals>
    </div>
  );
}
