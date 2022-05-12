import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import * as type from '../types/dashboardadmin';
import Cookies from 'js-cookie';
import axios from 'axios';
import { convertDate } from '../../helpers/convertDate';

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setDashboardStatus = (data) => ({
  type: type.STATUS,
  payload: data,
});

export const setRegionalSelected = (data) => ({
  type: type.SELECTED_REGIONAL,
  payload: data,
});

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setBulan = (data) => ({
  type: type.BULAN,
  payload: data,
});

export const setTahun = (data) => ({
  type: type.TAHUN,
  payload: data,
});

export const setReportHariIni = (data) => ({
  type: type.REPORT_HARI_INI,
  payload: data,
});

export const setReportKemarin = (data) => ({
  type: type.REPORT_KEMARIN,
  payload: data,
});

export const setReportKehadiran = (data) => ({
  type: type.REPORT_KEHADIRAN,
  payload: data,
});

export const setReportBelumAbsen = (data) => ({
  type: type.BELUM_ABSEN,
  payload: data,
});

export const setReportTidakAbsen = (data) => ({
  type: type.TIDAK_ABSEN,
  payload: data,
});

export const setReportTerlambat = (data) => ({
  type: type.REPORT_TERLAMBAT,
  payload: data,
});

export const setListSubUnit = (data) => ({
  type: type.LIST_SUB_UNIT,
  payload: data,
});

export const setListDirektorat = (data) => ({
  type: type.LIST_DIREKTORAT,
  payload: data,
});

export const setListUnit = (data) => ({
  type: type.LIST_UNIT,
  payload: data,
});

export const setSelectedUnit = (data) => ({
  type: type.UNIT_SELECT,
  payload: data,
});

export const setReportUnit = (data) => ({
  type: type.REPORT_UNIT,
  payload: data,
});

export const setReportDirektorat = (data) => ({
  type: type.REPORT_DIREKTORAT,
  payload: data,
});

export const setReportKerja = (data) => ({
  type: type.REPORT_KERJA,
  payload: data,
});

export const setReportKeterangan = (data) => ({
  type: type.REPORT_KETERANGAN,
  payload: data,
});

export const setListKaryawan = (data) => ({
  type: type.LIST_KARYAWAN,
  payload: data,
});

export const setKaryawanId = (data) => ({
  type: type.KARYAWAN_ID,
  payload: data,
});

export const setReportKaryawanId = (data) => ({
  type: type.REPORT_KARYAWAN_ID,
  payload: data,
});

export const setReportBulanan = (data) => ({
  type: type.REPORT_BULANAN,
  payload: data,
});

export const setReportDirektoratBulanan = (data) => ({
  type: type.REPORT_DIREKTORAT_BULANAN,
  payload: data,
});

export const setReportKehadiranBulanan = (data) => ({
  type: type.REPORT_KEHADIRAN_BULANAN,
  payload: data,
});

export const setReportKeteranganBualanan = (data) => ({
  type: type.REPORT_KETERANGAN_BULANAN,
  payload: data,
});
export const setReportKerjaBulanan = (data) => ({
  type: type.REPORT_KERJA_BULANAN,
  payload: data,
});

export const fetchDashboardKehadiran = async (data) => {
  setHeader();
  const result = await iota.fetchDataDashboardPresent();
  return result;
};

export const fetchDashboardStatus = async (data) => {
  setHeader();
  const result = await iota.fetchDataDashboardStatus();
  return result;
};

export const fetchDashboardHarian = (data) => async (dispatch) => {
  setHeader();
  dispatch(setLoading(true));
  const result = await iota

    .fetchDataDashboardDaily({
      params: {
        regional_id: data,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  dispatch(
    setReportTerlambat({
      name: 'Telat',
      value: result.kehadiran.telat.value,
      users: result.kehadiran.telat.users,
    }),
  );
  dispatch(
    setReportKemarin([
      {
        name: 'Tidak Absen',
        value: result.kemarin.tidak_checkin.length,
        users: result.kemarin.tidak_checkin,
      },
      {
        name: 'Tidak Checkout',
        value: result.kemarin.tidak_checkout.length,
        users: result.kemarin.tidak_checkout,
      },
    ]),
  );
  dispatch(
    setReportKehadiran([
      {
        name: 'Hadir',
        value:
          result.kehadiran.wfh.value +
          result.kehadiran.wfo.value +
          result.kehadiran.sppd.value,
        users: result.kehadiran.wfh.users.concat(
          result.kehadiran.wfo.users,
          result.kehadiran.sppd.users,
        ),
      },
      {
        name: 'Keterangan',
        value:
          result.kehadiran.sakit.value +
          result.kehadiran.cuti.value +
          result.kehadiran.sppd.value +
          result.kehadiran.izin.value,
        users: result.kehadiran.sakit.users.concat(
          result.kehadiran.cuti.users,
          result.kehadiran.sppd.users,
          result.kehadiran.izin.users,
        ),
      },
      {
        name: 'Terlambat',
        value: result.kehadiran.telat.value,
        users: result.kehadiran.telat.users,
      },
      {
        name: 'Belum Absen',
        value: result.kehadiran.tidak_hadir.value,
        users: result.kehadiran.tidak_hadir.users,
      },
      {
        name: 'Tidak Checkout',
        value: result.kemarin.tidak_checkout.length,
        users: result.kemarin.tidak_checkout,
      },
      {
        name: 'Tidak Absen',
        value: result.kemarin.tidak_checkin.length,
        users: result.kemarin.tidak_checkin,
      },
    ]),
  );
  dispatch(setReportDirektorat(result.dir));
  dispatch(setReportUnit(result.regional));
  dispatch(
    setReportKeterangan([
      {
        name: 'WFH',
        value: result.kehadiran.wfh.value,
        users: result.kehadiran.wfh.users,
      },
      {
        name: 'WFO',
        value: result.kehadiran.wfo.value,
        users: result.kehadiran.wfo.users,
      },
      {
        name: 'SPPD',
        value: result.kehadiran.sppd.value,
        users: result.kehadiran.sppd.users,
      },
      {
        name: 'Izin',
        value: result.kehadiran.izin.value,
        users: result.kehadiran.izin.users,
      },
      {
        name: 'Cuti',
        value: result.kehadiran.cuti.value,
        users: result.kehadiran.cuti.users,
      },
      {
        name: 'Sakit',
        value: result.kehadiran.sakit.value,
        users: result.kehadiran.sakit.users,
      },
    ]),
  );
  dispatch(
    setReportKerja([
      {
        name: 'WFH',
        value: result.kehadiran.wfh.value,
        users: result.kehadiran.wfh.users,
      },
      {
        name: 'WFO',
        value: result.kehadiran.wfo.value,
        users: result.kehadiran.wfo.users,
      },
    ]),
  );
  dispatch(setLoading(false));
  return result;
};

export const fetchDashboardBulanan = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  setHeader();

  const result = await iota
    .fetchDataDashboardMonthly({
      params: {
        month: data.month,
        year: data.year,
        regional_id: data.regional_id,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  let dataKehadiranBulanan = [
    {
      name: 'kehadiran',
      value: result.wfh + result.wfo + result.sppd,
    },
    {
      name: 'keterangan',
      value: result.cuti + result.sakit + result.sppd + result.izin ?? 0,
    },
    {
      name: 'terlambat',
      value: result.telat ?? 0,
    },
    {
      name: 'Tidak Absen',
      value: result.tidak_hadir ?? 0,
    },
  ];

  let dataKeteranganBulanan = [
    {
      name: 'WFH',
      value: result.wfh ?? 0,
    },
    {
      name: 'WFO',
      value: result.wfo ?? 0,
    },
    {
      name: 'SPPD',
      value: result.sppd ?? 0,
    },
    {
      name: 'Izin',
      value: result.izin ?? 0,
    },
    {
      name: 'Cuti',
      value: result.cuti ?? 0,
    },
    {
      name: 'Sakit',
      value: result.sakit ?? 0,
    },
  ];

  let dataKerjaBulanan = [
    {
      name: 'WFH',
      value: result.wfh ?? 0,
    },
    {
      name: 'WFO',
      value: result.wfo ?? 0,
    },
  ];

  dispatch(setReportDirektoratBulanan(result.dir));
  dispatch(setReportKehadiranBulanan(dataKehadiranBulanan));
  dispatch(setReportKeteranganBualanan(dataKeteranganBulanan));
  dispatch(setReportKerjaBulanan(dataKerjaBulanan));

  dispatch(setLoading(false));
};

export const fetchDashboardRegional = (data) => async (dispatch) => {
  setHeader();

  dispatch(setLoading(true));
  const result = await iota
    .fetchDataDashboardByRegional({
      params: {
        regional_id: data.regional_id,
        month: data.month,
        year: data.year,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });

  dispatch(setListKaryawan(result));
  dispatch(setLoading(false));
  return result;
};

export const fetchReportKaryawanId = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const result = await iota.fetchReportPersonal({
      params: {
        user_id: data.id,
        month: data.month,
        year: data.year,
        size: 100,
      },
    });

    dispatch(setLoading(false));
    dispatch(setReportKaryawanId(result.data.data));

    return {
      status: result.status,
      message: 'Success',
      data: result.data.data,
    };
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(true));

    const messageError = error?.response.data.message ?? 'Something Happened!';

    return {
      status: error?.response.status,
      message: messageError,
      data: null,
    };
  }
};

export const downloadReportByUnit = async (data) => {
  const token = Cookies.get('session');
  console.log(data);

  let url = `https://apiota.pins.co.id/api/absensi/export-user-by-regional?month=${data.month}&year=${data.year}`;

  if (
    typeof data.regional_id === 'string' ||
    typeof data.regional_id === 'number'
  ) {
    url = url + '&regional_id=' + data.regional_id;
  }

  var config = {
    method: 'get',
    url: url,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  };

  return await axios(config).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `List Absensi Teknisi ${convertDate('namaBulan', data.month)}-${
        data.year
      }.xlsx`,
    );
    document.body.appendChild(link);
    link.click();
  });
};

export const sendNotifReminder = async (data) => {
  try {
    const result = await iota.notifWa({
      id: data.id,
      nama_atasan: data.nama_atasan ?? 'ttd Atasan',
    });

    return {
      status: result.status,
      message: result.data.message,
      data: result.data,
    };
  } catch (error) {
    console.log('notif action error', error.response);

    const messageError = error?.response.data.message ?? 'Something Happened!';
    return {
      status: error?.response.status,
      message: messageError,
      data: null,
    };
  }
};
