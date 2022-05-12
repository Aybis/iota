import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeaderPage } from '../../../components/molecules';
import Layout from '../../includes/Layout';

export default function Index() {
  const navigate = useNavigate();

  return (
    <Layout showBottomBar={false}>
      <SectionHeaderPage title={'Manage Hari Libur'} />
      {/* Section Header */}
      <div className="relative my-4 px-4 lg:px-0 flex items-center justify-between">
        <div
          className="relative cursor-pointer hover:scale-110 rounded-lg transition-all duration-300 ease-out text-zinc-600"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
        </div>
      </div>
    </Layout>
  );
}
