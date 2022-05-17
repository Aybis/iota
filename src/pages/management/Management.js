import { CalendarIcon, UsersIcon } from '@heroicons/react/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeaderPage } from '../../components/molecules';
import Layout from '../includes/Layout';

export default function Management() {
  const navigate = useNavigate();
  const dataModules = [
    {
      name: 'Employee',
      isActive: true,
      icon: UsersIcon,
      link: '/management/users',
      isDisabled: false,
      colorBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      color: 'blue-500',
    },
    {
      name: 'Day Off',
      isActive: true,
      icon: CalendarIcon,
      isDisabled: false,
      link: '/management/libur',
      colorBg: 'bg-pink-100',
      iconColor: 'text-pink-500',
      color: 'pink-500',
    },
  ];

  return (
    <Layout isLeadOnly={true}>
      <SectionHeaderPage title={'Management'} />

      <div className="relative grid grid-cols-2 gap-6 lg:gap-8 my-8 px-4">
        {dataModules?.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.link)}
            className={[
              'relative bg-white rounded-lg p-4 flex flex-col space-y-4 justify-center items-center md:cursor-pointer group transition-all duration-300 ease-in-out shadow-lg shadow-zinc-200/20',
              item.colorBg,
              `hover:scale-105 `,
            ].join(' ')}>
            <div>
              <item.icon className={['h-24 w-24', item.iconColor].join(' ')} />
            </div>
            <p className="text-zinc-600 font-semibold text-sm lg:text-base">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
