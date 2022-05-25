import { ArrowNarrowLeftIcon, DocumentAddIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Modals, SearchInput } from '../../../components/atoms';
import {
  FormUser,
  SectionCardEmployee,
  SectionHeaderPage,
  SkeletonCardEmployee,
} from '../../../components/molecules';
import { setHeader } from '../../../config/api/constant';
import iota from '../../../config/api/route/iota';
import {
  fetchAllEmployee,
  setEmpLoading,
} from '../../../redux/actions/employee';
import { fetchAllRegional } from '../../../redux/actions/regional';
import { fetchDataWitel } from '../../../redux/actions/witel';
import Layout from '../../includes/Layout';

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const [resValidation, setresValidation] = useState([]);
  const USER = useSelector((state) => state.user);
  const EMPLOYEE = useSelector((state) => state.employee);
  const [filterData, setfilterData] = useState(EMPLOYEE?.allEmployee);

  //   ========= Handler Set Data Temp Modal =========
  const [formData, setformData] = useState({
    type: '',
    data: '',
  });

  //   ========= Handler Function Search User =========
  const handlerSearchEmployee = (event) => {
    dispatch(setEmpLoading(true));
    let result = EMPLOYEE?.allEmployee?.filter((item) => {
      return (
        item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.nik
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
    });
    setfilterData(result);
    setTimeout(() => {
      dispatch(setEmpLoading(false));
    }, 400);
  };

  //   ========= Handler Show Modal Form User =========
  const handlerShowModal = (type, item) => {
    setshowModal(true);

    setresValidation([]);

    setformData({
      type: type,
      data: item,
    });
  };

  //   ========= Handler Function Delete User =========
  const deleteUser = async (event, item) => {
    event.preventDefault();

    swal({
      title: 'Are you sure?',
      className: 'text-center',
      text: `Anda yakin ingin menghapus karyawan ${item.name} !`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setHeader();
        return iota
          .deleteUser(item.id)
          .then((res) => {
            dispatch(fetchAllEmployee()).then((res) => {
              setfilterData(res.data);
            });
            swal(res?.data?.message ?? 'Karyawan berhasil dihapus!', {
              icon: 'success',
            });
          })
          .catch((err) => {
            swal('Oh No!', 'Something Happened!', {
              icon: 'error',
            });
          });
      } else {
        swal('Okay!');
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllEmployee()).then((res) => {
      setfilterData(res.data);
    });
    dispatch(fetchDataWitel());
    dispatch(fetchAllRegional());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout showBottomBar={false} isLeadOnly={true}>
      <SectionHeaderPage title={'Manage Data Employee'} />

      {/* Section Header */}
      <div className="relative my-4 px-4 lg:-mt-2 lg:px-0 flex items-center justify-between">
        <div
          className="relative flex items-center space-x-2 cursor-pointer hover:scale-110 rounded-lg transition-all duration-300 ease-out text-zinc-600"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
          <span className="text-sm font-medium">Back</span>
        </div>
      </div>

      {/* Section Header List and Button Add Employee */}
      <div className="relative flex justify-between items-center my-8 px-4 md:px-0">
        <div>
          <p className="text-base sm:text-lg font-semibold text-zinc-700">
            List Data Employee
          </p>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Result : <span>{filterData?.length ?? ''} Employee</span>
          </p>
        </div>

        {String(USER?.profile?.role_id) === '3' && USER?.profile?.is_admin ? (
          <div className="relative flex justify-between items-center mb-4">
            <button
              onClick={() => handlerShowModal('add')}
              className="px-4 text-sm py-2 rounded-md text-white font-medium bg-blue-600 flex justify-center items-center gap-2 hover:bg-blue-400 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/50">
              <DocumentAddIcon className=" h-5" />
              Add Employee
            </button>
          </div>
        ) : (
          ''
        )}
      </div>

      {/* Form Input Search */}
      <div className="my-4 mx-2">
        <SearchInput
          addClassInput={'placeholder-zinc-400 text-sm'}
          onchange={handlerSearchEmployee}
          placeholder={'Search name, NIK'}
        />
      </div>

      {/* Container List Employee */}
      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 px-2">
        {EMPLOYEE?.isLoading ? (
          Array.from({ length: 20 }).map((item, index) => (
            <SkeletonCardEmployee key={index} />
          ))
        ) : filterData?.length > 0 ? (
          filterData?.map((item, index) => (
            <SectionCardEmployee
              key={index}
              isAdmin={USER?.profile?.is_admin}
              item={item}
              handlerDelete={deleteUser}
              handlerClick={handlerShowModal}
            />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-2 md:col-span-3 lg:col-span-4">
            <p className="font-medium text-zinc-500">Tidak ada data</p>
          </div>
        )}
      </div>

      {/* Modal CRUD */}
      <Modals
        dontClose={true}
        addClass={'w-full sm:w-1/2 max-w-xl'}
        open={showModal}
        handlerClose={setshowModal}
        title={formData.type + ' Employee'}
        addClassTitle="capitalize">
        {resValidation?.length > 0 &&
          resValidation?.map((item) => (
            <p
              key={Math.random()}
              className="text-left text-red-500 text-sm font-medium">
              * {item}
            </p>
          ))}
        <FormUser
          handlerErrValidation={setresValidation}
          handlerModal={setshowModal}
          dataTemp={formData}
          handlerFilterData={setfilterData}
        />
      </Modals>
    </Layout>
  );
}
