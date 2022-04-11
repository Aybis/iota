import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from '../components/atoms';
import { SectionHeaderPage } from '../components/molecules';
import {
  fetchDashboardBulanan,
  fetchDashboardHarian,
  fetchDashboardRegional,
  setRegionalSelected,
} from '../redux/actions/dashboardadmin';
import { setSelectedRegional } from '../redux/actions/regional';
import Layout from './includes/Layout';

export default function DashboardAbsensi() {
  const location = useLocation();
  const USER = useSelector((state) => state.user);
  const DASHBOARD = useSelector((state) => state.dashboardadmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataSubMenu = [
    {
      name: 'Harian',
      link: '/absensi',
      url: '/absensi',
    },
    {
      name: 'Bulanan',
      link: 'bulanan',
      url: '/absensi/bulanan',
    },
    {
      name: 'Karyawan',
      link: 'karyawan',
      url: '/absensi/karyawan',
    },
  ];

  const handlerOnChange = (item) => {
    dispatch(setSelectedRegional(item));

    if (location.pathname === '/absensi') {
      dispatch(setSelectedRegional(item));
      dispatch(setRegionalSelected(item));
      dispatch(fetchDashboardHarian(item.id));
    }

    if (location.pathname === '/absensi/bulanan') {
      dispatch(setSelectedRegional(item));
      dispatch(setRegionalSelected(item));
      dispatch(
        fetchDashboardBulanan({
          month: DASHBOARD?.bulan,
          year: DASHBOARD?.tahun,
          regional_id: item.id,
        }),
      );
    }

    if (location.pathname === '/absensi/karyawan') {
      dispatch(setSelectedRegional(item));
      dispatch(setRegionalSelected(item));
      dispatch(
        fetchDashboardRegional({
          regional_id: item.id,
          month: DASHBOARD?.bulan,
          year: DASHBOARD?.tahun,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(setSelectedRegional(DASHBOARD?.regionalSelected));
    if (USER?.profile?.role_id === '1') {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <SectionHeaderPage title={'Dashboard Absensi'} />

      {USER?.profile?.role_id === '3' && (
        <div className="relative m-4">
          <Dropdown handlerOnChnage={handlerOnChange} />
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
