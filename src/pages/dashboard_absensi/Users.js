import { DownloadIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/atoms';
import { SectionFilterMonthYear } from '../../components/molecules';
import { imageApiAvatarUser } from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';
import {
  fetchDashboardRegional,
  setBulan,
  setTahun,
} from '../../redux/actions/dashboardadmin';

export default function Users() {
  const dispatch = useDispatch();
  const DASHBOARD = useSelector((state) => state.dashboardadmin);
  const USER = useSelector((state) => state.user);
  const [temporary, setTemporary] = useState({
    month:
      convertDate('bulan') < 10
        ? `0${convertDate('bulan')}`
        : convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      dispatch(setBulan(event.target.value));

      setTemporary({
        month: event.target.value,
        year: temporary.year,
      });

      dispatch(
        fetchDashboardRegional({
          regional_id: DASHBOARD?.regionalSelected?.id,
          month: event.target.value,
          year: temporary.year,
        }),
      );
    }

    if (event.target.name === 'year') {
      dispatch(setTahun(event.target.value));

      setTemporary({
        month: temporary.month,
        year: event.target.value,
      });

      dispatch(
        fetchDashboardRegional({
          regional_id: DASHBOARD?.regionalSelected?.id,
          month: temporary.month,
          year: event.target.value,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(
      fetchDashboardRegional({
        regional_id:
          USER?.profile?.regional_id === ''
            ? DASHBOARD?.regionalSelected?.id
            : USER?.profile?.regional_id,
        month: temporary.month,
        year: temporary.year,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative my-8 mx-4">
      <div className="lg:container lg:mx-auto flex justify-center items-center relative -mt-6 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      {DASHBOARD?.isLoading ? (
        <div className="flex justify-center items-center p-4">
          <Loading height={8} width={8} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mt-8 mb-4">
            <p className="text-sm text-zinc-500 font-medium">
              Result : {DASHBOARD?.listKaryawan?.length}
            </p>
            <div className="flex space-x-1 justify-center items-center text-sm font-medium text-zinc-500">
              <DownloadIcon className="h-4" />
              <p>Download</p>
            </div>
          </div>

          <div className="relative grid grid-cols-1 gap-y-5 mt-4">
            {DASHBOARD?.listKaryawan?.map((item) => (
              <div
                key={Math.random()}
                className="flex flex-col bg-white shadow-lg shadow-zinc-200/50 rounded-lg p-3">
                <div className="flex space-x-3">
                  <img
                    src={
                      item?.image_url ??
                      imageApiAvatarUser(item?.name?.toLowerCase())
                    }
                    className="h-12 w-12 rounded-md"
                    alt=""
                  />
                  <div className="fle flex-col">
                    <p className="text-sm font-semibold text-zinc-800 capitalize">
                      {item?.name?.toLowerCase()}
                    </p>
                    <p className="text-sm font-medium text-zinc-500">
                      {item?.witel} - {item?.posisi}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 bg-zinc-100 px-4 py-2 rounded-md mt-4">
                  <div className="flex flex-col space-y-1">
                    <h1 className="text-xs font-medium text-zinc-400">
                      Presence
                    </h1>
                    <span className="font-semibold text-zinc-800">
                      {item?.wfh + item?.wfo}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h1 className="text-xs font-medium text-zinc-400">
                      Explanation
                    </h1>
                    <span className="font-semibold text-zinc-800">
                      {item?.cuti + item?.sakit + item?.sppd}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h1 className="text-xs font-medium text-zinc-400">Late</h1>
                    <span className="font-semibold text-zinc-800">
                      {item?.telat}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h1 className="text-xs font-medium text-zinc-400">
                      Absent
                    </h1>
                    <span className="font-semibold text-zinc-800">
                      {item?.tidak_hadir}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
