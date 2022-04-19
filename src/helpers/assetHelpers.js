import { LogoutIcon } from '@heroicons/react/outline';
import {
  BadgeCheckIcon,
  BeakerIcon,
  CheckIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  ClipboardListIcon,
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  LoginIcon,
  OfficeBuildingIcon,
  PhoneMissedCallIcon,
  TruckIcon,
  XIcon,
} from '@heroicons/react/solid';

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

    case 'SPPD':
      return 'Buss. Trip';
    case 'sppd':
      return 'Buss. Trip';
    case 'Sppd':
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
    case 'Hadir':
      return 'Presence';
    case 'Keterangan':
      return 'Explanation';
    case 'Terlambat':
      return 'Late';
    case 'Belum Absen':
      return 'Not Absence';
    case 'Sehat':
      return 'Health';

    default:
      return title;
  }
};

export const IconThumbnail = ({
  name,
  addClas,
  isBackground = false,
  backgroundClass,
}) => {
  switch (name) {
    case 'WFH':
      return (
        <HomeIcon
          className={[
            addClas,
            'text-green-500',
            isBackground && 'bg-green-100',
          ].join(' ')}
        />
      );
    case 'WFO':
      return (
        <OfficeBuildingIcon
          className={[
            addClas,
            'text-blue-500',
            isBackground && 'bg-blue-100',
          ].join(' ')}
        />
      );
    case 'izin':
      return (
        <ClipboardListIcon className={[addClas, 'text-zinc-500'].join(' ')} />
      );
    case 'Izin':
      return (
        <ClipboardListIcon className={[addClas, 'text-zinc-500'].join(' ')} />
      );
    case 'sakit':
      return <BeakerIcon className={[addClas, 'text-orange-500'].join(' ')} />;
    case 'Sakit':
      return <BeakerIcon className={[addClas, 'text-orange-500'].join(' ')} />;
    case 'cuti':
      return (
        <PhoneMissedCallIcon className={[addClas, 'text-red-500'].join(' ')} />
      );
    case 'Cuti':
      return (
        <PhoneMissedCallIcon className={[addClas, 'text-red-500'].join(' ')} />
      );
    case 'sppd':
      return (
        <GlobeAltIcon className={[addClas, 'text-indigo-500'].join(' ')} />
      );
    case 'SPPD':
      return (
        <GlobeAltIcon className={[addClas, 'text-indigo-500'].join(' ')} />
      );
    case 'absent':
      return <XIcon className={[addClas, 'text-red-500'].join(' ')} />;

    case 'Tidak Absen':
      return <XIcon className={[addClas, 'text-red-500'].join(' ')} />;

    case 'keterangan':
      return (
        <ClipboardCheckIcon className={[addClas, 'text-teal-500'].join(' ')} />
      );

    case 'belum absen':
      return <LoginIcon className={[addClas, 'text-red-500'].join(' ')} />;

    case 'Tidak Checkout':
      return <LogoutIcon className={[addClas, 'text-red-500'].join(' ')} />;
    case 'hadir':
      return <CheckIcon className={[addClas, 'text-blue-500'].join(' ')} />;

    case 'terlambat':
      return <ClockIcon className={[addClas, 'text-amber-500'].join(' ')} />;

    case 'pending':
      return (
        <ClockIcon
          className={[
            addClas,
            'text-red-500',
            isBackground && 'bg-red-100',
            backgroundClass,
          ].join(' ')}
        />
      );

    case 'todo':
      return (
        <ClipboardIcon
          className={[
            addClas,
            'text-zinc-500',
            isBackground && 'bg-zinc-100',
            backgroundClass,
          ].join(' ')}
        />
      );

    case 'progress':
      return (
        <TruckIcon
          className={[
            addClas,
            'text-amber-500',
            isBackground && 'bg-amber-100',
            backgroundClass,
          ].join(' ')}
        />
      );

    case 'completed':
      return (
        <BadgeCheckIcon
          className={[
            addClas,
            'text-teal-500',
            isBackground && 'bg-teal-100',
            backgroundClass,
          ].join(' ')}
        />
      );

    default:
      return <HomeIcon className={addClas} />;
  }
};
