export function removeCSSClass(ele, cls) {
  const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  ele.className = ele.className.replace(reg, ' ');
}

export function addCSSClass(ele, cls) {
  ele.classList.add(cls);
}

export const getImageFromAssets = (pathname) =>
  process.env.PUBLIC_URL + pathname;

export const getImageFromStorage = (pathname) =>
  process.env.REACT_APP_API_IMAGE + '/' + pathname;

export const imageApi = (name) =>
  `https://ui-avatars.com/api/?background=f4f4f5&color=000&length=2&name=${name}`;

export const imageApiAvatarUser = (name) =>
  `https://ui-avatars.com/api/?background=0062FF&color=FFF&length=2&name=${name}`;

export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase(),
  );

export const titleCard = (title) => {
  switch (title) {
    case 'WFO':
      return 'At Office';
    case 'WFH':
      return 'At Home';
    case 'sppd':
      return 'Buss. Trip';
    case 'SPPD':
      return 'Buss. Trip';
    case 'izin':
      return 'Permit';
    case 'Izin':
      return 'Permit';
    case 'absent':
      return 'Tidak Absen';
    case 'hadir':
      return 'Kehadiran';
    case 'cuti':
      return 'Leave';
    case 'sakit':
      return 'Sick';
    case 'Cuti':
      return 'Leave';
    case 'Sakit':
      return 'Sick';
    case 'kehadiran':
      return 'Presence';
    case 'Tidak Absen':
      return 'Absent';
    case 'keterangan':
      return 'Explanation';
    case 'terlambat':
      return 'Late';

    default:
      return title;
  }
};
