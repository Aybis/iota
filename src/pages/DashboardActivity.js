import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from '../components/atoms';
import { SectionHeaderPage } from '../components/molecules';
import { convertDate } from '../helpers/convertDate';
import {
  fetchActivityDoneDashboard,
  fetchActivityPendingDashboard,
  fetchActivityProgressDashboard,
  fetchAllActivity,
  setRegionalAct,
} from '../redux/actions/activity';
import { setSelectedRegional } from '../redux/actions/regional';
import Layout from './includes/Layout';

export default function DashboardActivity() {
  const location = useLocation();
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.user);
  const ACTIVITY = useSelector((state) => state.activity);
  const navigate = useNavigate();
  const dataSubMenu = [
    {
      name: 'Daily',
      link: '/activities',
      url: '/activities',
    },
    {
      name: 'Monthly',
      link: 'bulanan',
      url: '/activities/bulanan',
    },
    {
      name: 'Employee',
      link: 'karyawan',
      url: '/activities/karyawan',
    },
  ];

  const handlerOnChnage = (item) => {
    dispatch(setSelectedRegional(item));
    dispatch(setRegionalAct(item));

    if (location.pathname === '/activities') {
      dispatch(
        fetchActivityProgressDashboard({
          regional_id:
            USER?.profile?.regional_id === ''
              ? item?.id
              : USER?.profile?.regional_id,
          date: convertDate('tanggalFormat'),
        }),
      );

      dispatch(
        fetchActivityDoneDashboard({
          regional_id:
            USER?.profile?.regional_id === ''
              ? item?.id
              : USER?.profile?.regional_id,
          date: convertDate('tanggalFormat'),
        }),
      );

      dispatch(
        fetchActivityPendingDashboard({
          regional_id:
            USER?.profile?.regional_id === ''
              ? item?.id
              : USER?.profile?.regional_id,
        }),
      );
    } else if (location.pathname === '/activities/bulanan') {
      dispatch(
        fetchActivityProgressDashboard({
          regional_id:
            USER?.profile?.regional_id === ''
              ? item?.id
              : USER?.profile?.regional_id,
          date: `${ACTIVITY?.year}-${ACTIVITY?.month}`,
        }),
      );

      dispatch(
        fetchActivityDoneDashboard({
          regional_id:
            USER?.profile?.regional_id === ''
              ? item?.id
              : USER?.profile?.regional_id,
          date: `${ACTIVITY?.year}-${ACTIVITY?.month}`,
        }),
      );

      dispatch(
        fetchActivityPendingDashboard({
          regional_id:
            USER?.profile?.regional_id === ''
              ? item?.id
              : USER?.profile?.regional_id,
          date: `${ACTIVITY?.year}-${ACTIVITY?.month}`,
        }),
      );
    } else if (location.pathname === dataSubMenu[2].url) {
      dispatch(
        fetchAllActivity({
          regional_id:
            USER?.profile?.regional_id === ''
              ? item?.id
              : USER?.profile?.regional_id,
          date: `${ACTIVITY?.year}-${ACTIVITY?.month}`,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(setSelectedRegional(ACTIVITY?.regionalSelected));

    if (USER?.profile?.role_id === '1') {
      navigate('/404');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <SectionHeaderPage title={'Activity Dashboard'} />

      {USER?.profile?.role_id === '3' && (
        <div className="relative m-4">
          <Dropdown handlerOnChnage={handlerOnChnage} />
        </div>
      )}

      <div className="relative m-4 mt-8">
        <div className="grid grid-cols-3 gap-4">
          {dataSubMenu.map((item) => (
            <Link
              key={Math.random()}
              className={[
                'border-b-2 border-transparent pb-1',
                location.pathname === item.url
                  ? 'font-semibold text-zinc-800 border-blue-600'
                  : 'font-medium text-zinc-300 border-zinc-200',
              ].join(' ')}
              to={item.url}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </Layout>
  );
}
