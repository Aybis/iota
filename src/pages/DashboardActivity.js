import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Dropdown } from '../components/atoms';
import { SectionHeaderPage } from '../components/molecules';
import Layout from './includes/Layout';

export default function DashboardActivity() {
  const location = useLocation();
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.user);

  const dataSubMenu = [
    {
      name: 'Harian',
      link: '/activities',
      url: '/activities',
    },
    {
      name: 'Bulanan',
      link: 'bulanan',
      url: '/activities/bulanan',
    },
    {
      name: 'Karyawan',
      link: 'karyawan',
      url: '/activities/karyawan',
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <SectionHeaderPage title={'Dashboard Activity'} />

      {USER?.profile?.role_id === '3' && (
        <div className="relative m-4">
          <Dropdown />
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
