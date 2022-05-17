import {
  ArrowNarrowLeftIcon,
  DocumentAddIcon,
  IdentificationIcon,
  PencilAltIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { ButtonCustom, Input, Modals } from '../../../components/atoms';
import { SectionHeaderPage } from '../../../components/molecules';
import { setHeader } from '../../../config/api/constant';
import iota from '../../../config/api/route/iota';
import { imageApi } from '../../../helpers/assetHelpers';
import useForm from '../../../helpers/useForm';
import { fetchAllRegional } from '../../../redux/actions/regional';
import Layout from '../../includes/Layout';

export default function Index() {
  const navigate = useNavigate();
  const REGIONAL = useSelector((state) => state.regional);
  const [dataUsers, setdataUsers] = useState([]);
  const [loadingFetch, setloadingFetch] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [resValidation, setresValidation] = useState([]);
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);

  const [formData, setformData] = useState({
    type: '',
    data: '',
  });

  const [form, setform] = useForm({
    regional_id: '',
    role_id: '',
    name: '',
    email: '',
    nik: '',
    posisi: '',
    direktorat: '',
    witel: '',
    phone: '',
    password: 'password2022',
  });

  // set all form into one array
  // set exclude password and when role_id is leader remove regional to validation required
  const allForm = Object.entries(form)
    .filter((key) =>
      key[0] !== 'password' && form.role_id === '3'
        ? key[0] !== 'regional_id'
        : form.role_id !== '3'
        ? true
        : false,
    )
    .map((item) => item[1]);

  // remove all value property
  const removeValueProperty = () => {
    Object.entries(form).map((item, index) => {
      if (item[0] !== 'password') {
        form[item[0]] = '';
      }
      return true;
    });
  };

  // handler show modal add or update user
  const handlerShowModal = (type, item) => {
    setshowModal(true);

    removeValueProperty();
    setformData({
      type: type,
      data: item,
    });

    if (type !== 'add') {
      // set value data to form
      Object.entries(item).map((item, index) =>
        Object.entries(form).map((list) => {
          if (list[0] !== 'password') {
            if (list[0] === item[0]) {
              form[list[0]] = item[1] ?? '';
            }
          }
          return true;
        }),
      );
    }
  };

  // fetch data all user
  const fetchData = async () => {
    setloadingFetch(true);
    setHeader();
    return await iota
      .fetchAllUsers()
      .then((res) => {
        setdataUsers(res.data);
        setloadingFetch(false);
        return res;
      })
      .catch((err) => {
        setloadingFetch(false);
        return err.response;
      });
  };

  // add user
  const addUser = async () => {
    setisSubmit(true);
    try {
      const result = await iota.insertUser(form);
      if (result?.status === 200) {
        swal('Yeay', result?.data?.message, 'success');
        fetchData();
        removeValueProperty();
        setresValidation([]);
        setshowModal(false);
      }
      setisSubmit(false);
    } catch (error) {
      setisSubmit(false);
      swal('Oh No!', 'Something Happened', 'error');
      setresValidation(error?.response?.data?.message);
    }
  };

  // update user
  const updateUser = async () => {
    setisSubmit(true);
    try {
      const result = await iota.updateUser(formData?.data?.id, form);
      if (result?.status === 200) {
        swal('Yeay', result?.data?.message, 'success');
        fetchData();
        setresValidation([]);
        setshowModal(false);
      }
      setisSubmit(false);
    } catch (error) {
      setisSubmit(false);
      swal('Oh No!', 'Something Happened', 'error');
      setresValidation(error?.response?.data?.message);
    }
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (formData.type === 'add') {
      addUser();
    }
    if (formData.type === 'update') {
      updateUser();
    }
  };

  useEffect(() => {
    fetchData();
    dispatch(fetchAllRegional());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout showBottomBar={false}>
      <SectionHeaderPage title={'Manage Data Teknisi'} />
      {/* Section Header */}
      <div className="relative my-4 px-4 lg:-mt-2 lg:px-0 flex items-center justify-between">
        <div
          className="relative cursor-pointer hover:scale-110 rounded-lg transition-all duration-300 ease-out text-zinc-600"
          onClick={() => navigate(-1)}>
          <ArrowNarrowLeftIcon className="h-6" />
        </div>
      </div>

      {/* Section Header List and Button Add Employee */}
      <div className="relative flex justify-between items-center m-4">
        <div>
          <p className="text-base sm:text-lg font-semibold text-zinc-700">
            List Data Teknisi
          </p>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Result : <span>{dataUsers?.length ?? 0} Teknisi</span>
          </p>
        </div>

        <div className="relative flex justify-between items-center mb-4">
          <button
            onClick={() => handlerShowModal('add')}
            className="px-4 text-sm py-2 rounded-md text-white font-medium bg-blue-600 flex justify-center items-center gap-2 hover:bg-blue-400 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/50">
            <DocumentAddIcon className=" h-5" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 px-2">
        {loadingFetch ? (
          Array.from({ length: 20 }).map((item) => (
            <div
              key={Math.random()}
              className=" bg-white p-4 relative flex flex-col justify-center items-center space-y-4 shadow-lg shadow-zinc-200/40  rounded-lg">
              <img
                src={imageApi('')}
                alt=""
                className="h-20 w-20 rounded-lg animate-pulse"
              />
              <div className="relative w-full h-auto">
                <div className="relative text-sm text-zinc-700 font-semibold h-6 bg-zinc-100 rounded-md w-full transition-all animate-pulse"></div>
                <div className="relative mt-2 text-zinc-400 capitalize h-6 bg-zinc-100 rounded-md w-full transition-all animate-pulse"></div>
              </div>
            </div>
          ))
        ) : dataUsers?.length > 0 ? (
          dataUsers
            .slice()
            .reverse()
            .map((item) => (
              <div
                key={Math.random()}
                className="bg-white relative shadow-lg shadow-zinc-200/40 flex flex-col text-center rounded-lg divide-y divide-gray-200">
                <div className="flex-1 flex flex-col p-4 lg:p-8">
                  <img
                    className="w-20 h-20 lg:w-32 lg:h-32 flex-shrink-0 mx-auto rounded-full"
                    src={imageApi(item.name)}
                    alt=""
                  />
                  <h3 className="mt-6 text-gray-900 text-sm font-medium uppercase">
                    {item.name}
                  </h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-gray-500 text-xs md:text-sm">
                      {item.nik}
                    </dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                      <span
                        className={[
                          'px-2 py-1  text-xs font-medium  rounded-full',
                          item.role_id === '3' && 'bg-red-100 text-red-800',
                          item.role_id === '2' && 'bg-green-100 text-green-800',
                          item.role_id === '1' &&
                            'bg-yellow-100 text-yellow-800',
                        ].join(' ')}>
                        {item.role_id === '3'
                          ? 'Leader'
                          : item.role_id === '2'
                          ? 'Manager'
                          : 'Teknisi'}
                      </span>
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <button
                        onClick={() => handlerShowModal('view', item)}
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-xs md:text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-400 group">
                        <IdentificationIcon
                          className="md:w-5 md:h-5 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">View</span>
                      </button>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex">
                      <button
                        onClick={() => handlerShowModal('update', item)}
                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-xs md:text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-400 group">
                        <PencilAltIcon
                          className="md:w-5 md:h-5 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Update</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="flex justify-center items-center col-span-2 md:col-span-3 lg:col-span-4">
            <p className="font-medium text-zinc-500">Tidak ada data</p>
          </div>
        )}
      </div>

      {/* Form Employee */}
      <Modals
        dontClose={true}
        addClass={'w-full sm:w-1/2'}
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
        <form
          onSubmit={handlerSubmit}
          className={[
            'relative flex flex-col space-y-3 overflow-auto px-1',
            resValidation?.length > 0 && 'mt-3',
          ].join(' ')}>
          {/* Input Role */}
          <div className="sm:col-span-3 text-left">
            <label
              htmlFor="role"
              className="block text-sm text-gray-700 capitalize">
              Role
            </label>
            <select
              disabled={formData?.type === 'view'}
              onChange={(e) => setform(e)}
              name="role_id"
              value={form.role_id}
              className="disabled:bg-zinc-100 disabled:cursor-not-allowed mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
              <option value="" disabled>
                Choose Role
              </option>
              <option value="1">Technisian</option>
              <option value="2">Manager</option>
              <option value="3">Leader</option>
            </select>
          </div>

          {/* Input Regional */}
          {form.role_id !== '' && form.role_id !== '3' && (
            <div className="sm:col-span-3 text-left">
              <label
                htmlFor="regional"
                className="block text-sm text-gray-700 capitalize">
                Regional
              </label>
              <select
                onChange={(e) => setform(e)}
                disabled={formData?.type === 'view'}
                name="regional_id"
                value={
                  formData?.type === 'add'
                    ? form.regional_id
                    : formData?.data?.regional_id
                }
                className="disabled:bg-zinc-100 disabled:cursor-not-allowed mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                <option value="" disabled>
                  Choose Regional
                </option>
                {REGIONAL?.listRegional?.length > 0
                  ? REGIONAL?.listRegional
                      ?.filter((id) => id.alias !== 'ALL TREG')
                      .map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.alias}
                        </option>
                      ))
                  : ''}
              </select>
            </div>
          )}

          {/* Validasi when regional and role have been input or role input as leader  */}
          {((form.role_id !== '' && form.regional_id !== '') ||
            form.role_id === '3') &&
            Object.entries(form)
              .filter(
                (name) =>
                  name[0] !== 'password' &&
                  name[0] !== 'role_id' &&
                  name[0] !== 'regional_id',
              )
              .map((input, index) => (
                <Input
                  disabled={formData?.type === 'view' ? true : false}
                  addClassLabel={
                    input[0].toLowerCase() === 'nik'
                      ? 'uppercase'
                      : 'capitalize'
                  }
                  key={index}
                  label={input[0] + ' *'}
                  name={input[0]}
                  value={form[input[0]]}
                  onchange={setform}
                  inputType={
                    input[0] === 'email'
                      ? 'email'
                      : input[0] === 'phone'
                      ? 'number'
                      : 'text'
                  }
                  autoComplete={index + Math.random()}
                  note={
                    input[0] === 'phone' ? 'Phone number format 0812xxx' : ''
                  }
                />
              ))}

          <div className="relative">
            <div className="relative flex justify-between items-center mt-6">
              {formData?.type !== 'view' ? (
                <ButtonCustom
                  isSubmit={isSubmit}
                  isDisabled={allForm?.includes('')}
                  moreClass={'capitalize'}>
                  {formData.type} Employee
                </ButtonCustom>
              ) : (
                <div></div>
              )}

              <ButtonCustom
                typeButton="button"
                handlerClick={() => setshowModal(false)}
                type="danger"
                isSubmit={isSubmit}>
                Close
              </ButtonCustom>
            </div>
          </div>
        </form>
      </Modals>
    </Layout>
  );
}
