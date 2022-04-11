import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import * as type from '../types/dashboarduser';

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setKehadiran = (data) => ({
  type: type.KEHADIRAN,
  payload: data,
});
export const setKeterangan = (data) => ({
  type: type.KETERANGAN,
  payload: data,
});
export const setTerlambat = (data) => ({
  type: type.TERLAMBAT,
  payload: data,
});
export const setAbsent = (data) => ({
  type: type.ABSENT,
  payload: data,
});
export const setWork = (data) => ({
  type: type.WORK,
  payload: data,
});
export const setSummary = (data) => ({
  type: type.SUMMARY,
  payload: data,
});

export const setStatus = (data) => ({
  type: type.STATUS,
  payload: data,
});
export const setProgress = (data) => ({
  type: type.PROGRESS,
  payload: data,
});

export const fetchDataSummary = (data) => async (dispatch) => {
  setHeader();
  dispatch(setLoading(true));
  const result = await iota
    .fetchSummaryPersonal({
      params: {
        user_id: data.user_id,
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
  let sakit = filterDataPresence(result?.presence, 'sakit');
  let ijin = filterDataPresence(result?.presence, 'izin');
  let sppd = filterDataPresence(result?.presence, 'sppd');
  let cuti = filterDataPresence(result?.presence, 'cuti');
  let hadir = filterDataPresence(result?.presence, 'hadir');
  let telat = filterDataPresence(result?.presence, 'telat');
  let absent = filterDataPresence(result?.presence, 'absent');
  let status = result?.presence.filter(
    (item) =>
      item.name !== 'hadir' && item.name !== 'telat' && item.name !== 'absent',
  );
  let work = result?.work.filter((item) => item.name !== 'Satelit');

  dispatch(setWork(work));
  dispatch(setStatus(status));
  dispatch(
    setSummary({
      kehadiran: work.concat(status),
      absensi: {
        hadir: hadir,
        keterangan: sakit + ijin + sppd + cuti,
        terlambat: telat,
        absen: absent,
      },
    }),
  );
  dispatch(setAbsent(absent));
  dispatch(setKehadiran(hadir));
  dispatch(setTerlambat(telat));
  dispatch(setKeterangan(sakit + ijin + sppd + cuti));
  dispatch(setLoading(false));

  return result;
};

export const filterDataPresence = (obj, predicate) => {
  const result = obj.filter((item) => item.name === predicate);
  return result[0].value;
};
