import { convertDate } from '../../helpers/convertDate';
import * as type from '../types/dashboardadmin';

const initialState = {
  bulan: convertDate('bulan'),
  tahun: convertDate('tahun'),
  regionalSelected: {
    id: null,
    name: 'ALL TREG',
    alias: 'ALL TREG',
  },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.REPORT_KEHADIRAN:
      return {
        ...state,
        reportKehadiran: action.payload,
      };
    case type.REPORT_HARI_INI:
      return {
        ...state,
        today: action.payload,
      };
    case type.REPORT_KEMARIN:
      return {
        ...state,
        yesterday: action.payload,
      };

    case type.REPORT_TERLAMBAT:
      return {
        ...state,
        reportTerlambat: action.payload,
      };
    case type.BELUM_ABSEN:
      return {
        ...state,
        belumAbsen: action.payload,
      };
    case type.TIDAK_ABSEN:
      return {
        ...state,
        tidakAbsen: action.payload,
      };
    case type.LIST_UNIT:
      return {
        ...state,
        listUnit: action.payload,
      };
    case type.LIST_DIREKTORAT:
      return {
        ...state,
        listDirektorat: action.payload,
      };
    case type.LIST_SUB_UNIT:
      return {
        ...state,
        listSubUnit: action.payload,
      };
    case type.UNIT_SELECT:
      return {
        ...state,
        unitSelected: action.payload,
      };

    case type.SELECTED_REGIONAL:
      return {
        ...state,
        regionalSelected: action.payload ?? {},
      };
    case type.REPORT_UNIT:
      return {
        ...state,
        reportUnit: action.payload,
      };
    case type.REPORT_DIREKTORAT:
      return {
        ...state,
        reportDirektorat: action.payload,
      };
    case type.REPORT_KERJA:
      return {
        ...state,
        reportKerja: action.payload,
      };
    case type.REPORT_KETERANGAN:
      return {
        ...state,
        reportKeterangan: action.payload,
      };
    case type.LIST_KARYAWAN:
      return {
        ...state,
        listKaryawan: action.payload,
      };
    case type.KARYAWAN_ID:
      return {
        ...state,
        karyawanId: action.payload,
      };
    case type.REPORT_KARYAWAN_ID:
      return {
        ...state,
        reportKaryawanId: action.payload,
      };
    case type.REPORT_BULANAN:
      return {
        ...state,
        reportBulanan: action.payload,
      };
    case type.REPORT_DIREKTORAT_BULANAN:
      return {
        ...state,
        reportDirektoratBulanan: action.payload,
      };
    case type.REPORT_KEHADIRAN_BULANAN:
      return {
        ...state,
        reportKehadiranBulanan: action.payload,
      };
    case type.REPORT_KERJA_BULANAN:
      return {
        ...state,
        reportKerjaBulanan: action.payload,
      };
    case type.REPORT_KETERANGAN_BULANAN:
      return {
        ...state,
        reportKeteranganBulanan: action.payload,
      };
    case type.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case type.ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case type.STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case type.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case type.BULAN:
      return {
        ...state,
        bulan: action.payload,
      };
    case type.TAHUN:
      return {
        ...state,
        tahun: action.payload,
      };

    default:
      return state;
  }
}
