import React from 'react';
import { useSelector } from 'react-redux';
import Admin from './privilege/Admin';
import Teknisi from './privilege/Teknisi';

export default function Home() {
  const USER = useSelector((state) => state.user);

  return String(USER?.profile?.role_id) === '1' ? <Teknisi /> : <Admin />;
}
