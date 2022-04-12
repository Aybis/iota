import { DownloadIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modals } from '../components/atoms';
import Loading from '../components/atoms/Loading';
import { SectionReportBulanan } from '../components/molecules';
import SectionFilterMonthYear from '../components/molecules/SectionFilterMonthYear';
import SectionHeaderPage from '../components/molecules/SectionHeaderPage';
import SectionReportMingguan from '../components/molecules/SectionReportMingguan';
import { convertDate } from '../helpers/convertDate';
import {
  fetchAbsensiBulanan,
  fetchAbsensiMingguan,
  setDownloadParam,
} from '../redux/actions/reportuser';
import Layout from './includes/Layout';

export default function ReportUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const USER = useSelector((state) => state.user);
  const REPORT = useSelector((state) => state.reportuser);
  const [showModal, setshowModal] = useState(false);
  const [imageSource, setimageSource] = useState('');
  const [temporary, setTemporary] = useState({
    month:
      convertDate('bulan') < 10
        ? `0${convertDate('bulan')}`
        : convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const handlerClickImage = (event) => {
    setshowModal(true);
    setimageSource(event.target.src);
  };

  const handlerOnChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'month') {
      setTemporary({
        month: event.target.value,
        year: temporary.year,
      });
      dispatch(
        fetchAbsensiBulanan({
          id: USER?.profile.id,
          month: event.target.value,
          year: temporary.year,
        }),
      );
      dispatch(
        setDownloadParam({
          id: USER?.profile.id,
          name: USER?.profile.name,
          month: event.target.value,
          year: temporary.year,
        }),
      );
    }

    if (event.target.name === 'year') {
      setTemporary({
        month: temporary.month,
        year: event.target.value,
      });
      dispatch(
        fetchAbsensiBulanan({
          id: USER?.profile.id,
          month: temporary.month,
          year: event.target.value,
        }),
      );
      dispatch(
        setDownloadParam({
          id: USER?.profile.id,
          name: USER?.profile.name,
          month: temporary.month,
          year: event.target.value,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(fetchAbsensiMingguan(USER?.profile?.id));
    dispatch(
      setDownloadParam({
        id: USER?.profile.id,
        name: USER?.profile.name,
        month: convertDate('bulan'),
        year: convertDate('tahun'),
      }),
    );
    dispatch(
      fetchAbsensiBulanan({
        id: USER?.profile.id,
        month: convertDate('bulan'),
        year: convertDate('tahun'),
      }),
    );

    if (USER?.profile?.role_id !== '1') {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <SectionHeaderPage title={'Personal Absence Attendance'} />

      <div className="relative mt-8 max-w-7xl container mx-auto">
        <h1 className="px-4 font-semibold text-zinc-900">
          Attendance This Week
        </h1>
        <div className="flex overflow-x-auto  lg:grid grid-cols-5 gap-4  p-4">
          {REPORT?.mingguan?.length > 0 ? (
            REPORT?.mingguan?.map((item) => (
              <SectionReportMingguan key={Math.random()} item={item} />
            ))
          ) : (
            <p className="text-center flex w-full items-center justify-center text-zinc-500 font-semibold mt-6">
              Belum ada absen minggu ini!
            </p>
          )}
        </div>
      </div>

      <div className="lg:container lg:mx-auto flex justify-center items-center relative mt-4 px-4 lg:px-0">
        <SectionFilterMonthYear
          month={temporary.month}
          year={temporary.year}
          handlerChange={handlerOnChange}
        />
      </div>

      <div className="container mx-auto max-w-7xl flex flex-col gap-3 px-4 my-8">
        <div className="relative flex justify-between items-center mb-4">
          <span className="text-sm lg:text-base font-medium text-zinc-600">
            Result : {REPORT?.bulanan?.length}
          </span>
          <a
            href={REPORT?.linkDownload}
            className="flex gap-1 cursor-pointer hover:border-zinc-600 border-b-2 border-transparent items-center justify-center text-sm lg:text-base font-medium text-zinc-600">
            <DownloadIcon className="h-4" />
            Download
          </a>
        </div>
        <div className="flex gap-6 flex-col">
          {REPORT?.isLoading ? (
            <div className="flex justify-center items-center">
              <Loading height={6} width={6} />
            </div>
          ) : REPORT?.bulanan?.length > 0 ? (
            REPORT?.bulanan?.map((item) => (
              <SectionReportBulanan
                key={Math.random()}
                item={item}
                handlerClickImage={handlerClickImage}
              />
            ))
          ) : (
            <p className="text-center text-sm lg:text-base text-zinc-500 font-semibold mt-6">
              Belum ada absen bulan ini!
            </p>
          )}
        </div>
      </div>
      <Modals position="center" open={showModal} handlerClose={setshowModal}>
        <img
          src={imageSource}
          alt={imageSource}
          className="rounded-lg object-cover lg:h-96"
        />
      </Modals>
    </Layout>
  );
}
