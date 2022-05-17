import {
  ArrowLeftIcon,
  DocumentAddIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
  ButtonCustom,
  Input,
  Loading,
  Modals,
  TableBody,
  TableContent,
  TableHeading,
} from '../../../components/atoms';
import {
  SectionFilterMonthYear,
  SectionHeaderPage,
} from '../../../components/molecules';
import SectionPagination from '../../../components/molecules/SectionPagination';
import { setHeader } from '../../../config/api/constant';
import iota from '../../../config/api/route/iota';
import { convertDate } from '../../../helpers/convertDate';
import useForm from '../../../helpers/useForm';
import {
  fetchDataHoliday,
  insertDataHoliday,
  updateDataHoliday,
} from '../../../redux/actions/libur';
import Layout from '../../includes/Layout';

export default function Index() {
  const HOLIDAY = useSelector((state) => state.holiday);
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [formModal, setformModal] = useState({
    type: '',
    title: '',
    id: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useForm({
    nama: '',
    tanggal: '',
  });

  const [temp, settemp] = useState({
    month:
      convertDate('bulan') < 10
        ? `0${convertDate('bulan')}`
        : convertDate('bulan'),
    year: convertDate('tahun'),
  });

  const handlerPagination = (item) => {
    dispatch(fetchDataHoliday(item, `${temp.year}`, 10));
  };

  const handlerShowModal = (type, data) => {
    setshowModal(true);

    if (type === 'add') {
      setformModal({
        ...formModal,
        type: 'add',
        title: 'Tambah Hari Libur',
      });
      state.nama = '';
      state.tanggal = '';
    } else {
      setformModal({
        ...formModal,
        id: data.id,
        type: 'update',
        title: 'Update Hari Libur',
      });

      state.nama = data.nama;
      state.tanggal = data.tanggal;
    }
  };

  const handlerUpdateHoliday = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const result = await dispatch(updateDataHoliday(state, formModal.id));
      if (result.status === 200) {
        dispatch(
          fetchDataHoliday(
            HOLIDAY?.pagination?.current_page,
            temp.year,
            HOLIDAY?.pagination?.per_page,
          ),
        );

        setloading(false);
        setshowModal(false);
        swal(
          'Yeay!',
          result?.data?.message ?? 'Berhasil memperbaharui data hari libur',
          'success',
        );
        return;
      } else {
        setloading(false);

        swal('Oh No!', result.data.message ?? 'Something Happenned!', 'error');
        return;
      }
    } catch (error) {
      setloading(false);

      swal('Oh No!', 'Something Happenned!', 'error');
      return;
    }
  };

  const handlerInsertHoliday = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const result = await dispatch(insertDataHoliday(state));
      if (result.status === 200) {
        dispatch(
          fetchDataHoliday(
            HOLIDAY?.pagination?.current_page,
            temp.year,
            HOLIDAY?.pagination?.per_page,
          ),
        );

        setloading(false);
        setshowModal(false);
        swal('Yeay!', result.data.message, 'success');
      } else {
        swal('Oh No!', result.data.message ?? 'Something Happenned!', 'error');
      }
    } catch (error) {
      swal('Oh No!', error ?? 'Something Happenned!', 'error');
    }
  };

  const handlerDeleteHoliday = (event, item) => {
    event.preventDefault();

    swal({
      title: 'Are you sure?',
      className: 'text-center',
      text: `Anda yakin ingin menghapus hari ${item.nama} !`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setHeader();
        return iota
          .deleteHoliday(item.id)
          .then((res) => {
            dispatch(
              fetchDataHoliday(
                HOLIDAY?.pagination?.current_page ?? 1,
                temp.year,
                HOLIDAY?.pagination?.per_page,
              ),
            );
            swal(res?.data?.message ?? 'Hari berhasil dihapus!', {
              icon: 'success',
            });
          })
          .catch((err) => {
            swal('Something Happened!', {
              icon: 'error',
            });
          });
      } else {
        swal('Okay!');
      }
    });
  };

  const handlerOnChange = async (event) => {
    setloading(true);
    event.preventDefault();

    if (event.target.name === 'year') {
      settemp({
        month: temp.month,
        year: event.target.value,
      });

      dispatch(
        fetchDataHoliday(
          HOLIDAY?.pagination?.current_page,
          event.target.value,
          HOLIDAY?.pagination?.per_page,
        ),
      );
    }

    setTimeout(() => {
      setloading(false);
    }, 200);
  };

  useEffect(() => {
    dispatch(fetchDataHoliday(1, temp.year, '10'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout showBottomBar={false} isLeadOnly={true} isAdminOnly={true}>
      <SectionHeaderPage title={'Management Libur Tahunan'} />

      <div className="relative mx-auto container px-4 pt-4 lg:-mt-4 lg:px-0 max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="w-fit text-zinc-600 pb-2 flex space-x-1 items-center lg:text-lg hover:font-semibold transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-zinc-600">
          <ArrowLeftIcon className="h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="relative my-4 mx-auto container flex justify-center items-center">
        <SectionFilterMonthYear
          showMonth={false}
          handlerChange={handlerOnChange}
          month={temp?.month}
          year={temp?.year}
        />
      </div>

      <div className="relative my-8 p-4 container mx-auto max-w-7xl bg-white rounded-xl shadow-lg shadow-zinc-200/50">
        <div className="relative flex justify-between items-center mb-4">
          <h4 className="font-semibold text-zinc-700">List Dayoff</h4>

          <button
            onClick={() => handlerShowModal('add')}
            className="px-4 py-2 rounded-md text-white font-medium bg-blue-600 flex justify-center items-center gap-2">
            <DocumentAddIcon className=" h-5" />
            Add Day
          </button>
        </div>

        {HOLIDAY?.loading ? (
          <div className="relative flex w-full justify-center items-center">
            <Loading height={6} width={6} />
          </div>
        ) : (
          <TableHeading theading={['no', 'action'].concat(HOLIDAY.tableHeader)}>
            {HOLIDAY?.listData?.length > 0 ? (
              HOLIDAY?.listData?.map((item, index) => (
                <TableBody key={index} index={index}>
                  <TableContent>
                    {HOLIDAY?.pagination?.current_page === 1
                      ? index + 1
                      : index < 9
                      ? `${HOLIDAY?.pagination?.current_page - 1}${index + 1}`
                      : `${HOLIDAY?.pagination?.current_page}0`}
                  </TableContent>
                  <TableContent addClassChild={'flex gap-4'}>
                    <ButtonCustom
                      handlerClick={() => handlerShowModal('update', item)}
                      type="edit">
                      <PencilAltIcon className="h-5" />
                      Edit
                    </ButtonCustom>
                    <ButtonCustom
                      handlerClick={(e) => handlerDeleteHoliday(e, item)}
                      type="danger">
                      <TrashIcon className="h-5" />
                      Delete
                    </ButtonCustom>
                  </TableContent>
                  <TableContent>{item.nama}</TableContent>
                  <TableContent>
                    {convertDate('tanggalBulanTahun', item.tanggal)}
                  </TableContent>
                </TableBody>
              ))
            ) : (
              <TableBody>
                <TableContent
                  addClassChild={'text-center'}
                  rowSpan={HOLIDAY?.tableHeader?.length}
                  colSpan={HOLIDAY?.tableHeader?.length}>
                  Haven't data yet
                </TableContent>
              </TableBody>
            )}
          </TableHeading>
        )}

        {HOLIDAY?.listData?.length > 0 ? (
          <SectionPagination
            currentPage={HOLIDAY?.pagination?.current_page}
            perPage={parseInt(HOLIDAY?.pagination?.per_page)}
            total={HOLIDAY?.pagination?.total}
            handlerClick={handlerPagination}
            lastPage={HOLIDAY?.pagination?.last_page}
          />
        ) : (
          ' '
        )}
      </div>

      <Modals
        addClass={'sm:w-1/2 w-full'}
        handlerClose={setshowModal}
        open={showModal}
        title={formModal?.title}>
        <div className="relative w-lg">
          <form
            onSubmit={
              formModal?.type === 'add'
                ? handlerInsertHoliday
                : handlerUpdateHoliday
            }>
            <Input
              onchange={setState}
              label={'Nama'}
              name="nama"
              value={state.nama}
            />
            <Input
              onchange={setState}
              inputType="date"
              label={'Tanggal'}
              name="tanggal"
              value={state.tanggal}
              addClassParent={'mt-4'}
            />
            <ButtonCustom isSubmit={loading} moreClass={'mt-6'}>
              {formModal?.type === 'add' ? 'Tambah' : 'Update'}
            </ButtonCustom>
          </form>
          <div className="flex justify-end items-center">
            <ButtonCustom
              handlerClick={() => setshowModal(false)}
              type="danger"
              moreClass={'mt-6'}>
              Close
            </ButtonCustom>
          </div>
        </div>
      </Modals>
    </Layout>
  );
}
