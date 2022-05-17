import { ArrowNarrowLeftIcon, DocumentAddIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
  ButtonCustom,
  Input,
  Modals,
  SearchInput,
  Select,
} from '../../../components/atoms';
import {
  SectionCardEmployee,
  SectionHeaderPage,
  SkeletonCardEmployee,
} from '../../../components/molecules';
import { setHeader } from '../../../config/api/constant';
import iota from '../../../config/api/route/iota';
import useForm from '../../../helpers/useForm';
import {
  fetchAllEmployee,
  insertEmployee,
  setEmpLoading,
  updateEmployee,
} from '../../../redux/actions/employee';
import { fetchAllRegional } from '../../../redux/actions/regional';
import Layout from '../../includes/Layout';

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmit, setisSubmit] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [resValidation, setresValidation] = useState([]);
  const USER = useSelector((state) => state.user);
  const REGIONAL = useSelector((state) => state.regional);
  const EMPLOYEE = useSelector((state) => state.employee);
  const [filterData, setfilterData] = useState(EMPLOYEE?.allEmployee);

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

  const handlerSearchEmployee = (event) => {
    dispatch(setEmpLoading(true));
    let result = EMPLOYEE?.allEmployee?.filter((item) => {
      return (
        item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.nik
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.witel
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
    setresValidation([]);

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

  // add user
  const addUser = async () => {
    setisSubmit(true);
    try {
      const result = await dispatch(insertEmployee(form));
      if (result?.status === 200) {
        setshowModal(false);
        dispatch(fetchAllEmployee()).then((res) => {
          setfilterData(res.data);
        });
      }
      setisSubmit(false);
    } catch (error) {
      setisSubmit(false);
      setresValidation(error?.response?.data?.message);
    }
  };

  // update user
  const updateUser = async () => {
    setisSubmit(true);
    try {
      const result = await dispatch(updateEmployee(formData?.data?.id, form));
      if (result?.status === 200) {
        setshowModal(false);
        dispatch(fetchAllEmployee()).then((res) => {
          setfilterData(res.data);
        });
      } else {
        setresValidation(result?.data?.message);
      }
      setisSubmit(false);
    } catch (error) {
      return true;
    }
  };

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
    dispatch(fetchAllEmployee()).then((res) => {
      setfilterData(res.data);
    });
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
            Result : <span>{filterData?.length ?? 0} Employee</span>
          </p>
        </div>

        {USER?.profile?.role_id === '3' && (
          <div className="relative flex justify-between items-center mb-4">
            <button
              onClick={() => handlerShowModal('add')}
              className="px-4 text-sm py-2 rounded-md text-white font-medium bg-blue-600 flex justify-center items-center gap-2 hover:bg-blue-400 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/50">
              <DocumentAddIcon className=" h-5" />
              Add Employee
            </button>
          </div>
        )}
      </div>

      <div className="my-4 mx-2">
        <SearchInput
          onchange={handlerSearchEmployee}
          placeholder={'Search name, NIK, witel'}
        />
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 px-2">
        {EMPLOYEE?.isLoading ? (
          Array.from({ length: 20 }).map((item, index) => (
            <SkeletonCardEmployee key={index} />
          ))
        ) : filterData?.length > 0 ? (
          filterData
            ?.slice()
            .reverse()
            .map((item, index) => (
              <SectionCardEmployee
                key={index}
                isAdmin={USER?.profile?.role_id === '3'}
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
          <Select
            isDisabled={formData?.type === 'view'}
            onchange={setform}
            name="role_id"
            value={form.role_id}
            labelName="Role">
            <option value="1">Technician</option>
            <option value="2">Manager</option>
            <option value="3">Leader</option>
          </Select>

          {/* Input Regional */}
          {form.role_id !== '' && form.role_id !== '3' && (
            <Select
              isDisabled={formData?.type === 'view'}
              labelName={'Regional'}
              name="regional_id"
              onchange={setform}
              value={
                formData?.type === 'add'
                  ? form.regional_id
                  : formData?.data?.regional_id
              }>
              {REGIONAL?.listRegional?.length > 0
                ? REGIONAL?.listRegional
                    ?.filter((id) => id.alias !== 'ALL TREG')
                    .map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.alias}
                      </option>
                    ))
                : ''}
            </Select>
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
                  type={formData?.type === 'add' ? 'in' : 'edit'}
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
