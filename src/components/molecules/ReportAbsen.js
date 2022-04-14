import {
  getImageFromAssets,
  getImageFromStorage,
} from '../../helpers/assetHelpers';
import { convertDate } from '../../helpers/convertDate';

export default function ReportAbsen({
  type = 'in',
  tanggal,
  jam,
  lokasi,
  handlerClickImage,
  checkout,
  image,
  kehadiran,
  keterangan,
}) {
  return (
    <div
      className={[
        'flex space-x-4 pt-2 px-4 lg:w-2/3',
        type === 'out' && 'lg:flex-row-reverse lg:gap-4',
      ].join(' ')}>
      <img
        onClick={(event) => handlerClickImage(event)}
        className="h-16 w-16 lg:h-24 lg:w-24 rounded-md object-cover cursor-pointer shadow-md shadow-zinc-200/50"
        src={
          image === '' || image === null
            ? getImageFromAssets('assets/nfimage.jpeg')
            : image === 'By system'
            ? getImageFromAssets('assets/nfimage.jpeg')
            : getImageFromStorage(image)
        }
        alt={Math.random()}
      />
      <div
        className={[
          'flex flex-col space-y-1 w-5/6',
          type === 'out' && 'lg:text-right',
        ].join(' ')}>
        <p className="text-xs lg:text-sm font-medium text-zinc-600">
          {convertDate('tanggalHari', tanggal)}
        </p>
        <p className="text-sm font-semibold">
          <span className="text-zinc-900">
            {convertDate('jamAM', jam) + ' '}{' '}
          </span>{' '}
          -{' '}
          {kehadiran !== null && (
            <span
              className={
                type === 'out'
                  ? checkout === 'Normal'
                    ? 'text-blue-600'
                    : 'text-red-600'
                  : kehadiran && keterangan
                  ? 'text-red-600'
                  : 'text-blue-600'
              }>
              {type === 'out'
                ? checkout === 'Normal'
                  ? 'Discipline'
                  : 'Undisciplined'
                : kehadiran && keterangan
                ? 'Undisciplined'
                : 'Discipline'}
            </span>
          )}
        </p>
        <p className="text-xs font-normal text-zinc-700">
          {type === 'out'
            ? checkout === 'Normal'
              ? lokasi
              : checkout
            : lokasi}
        </p>
        <p className="text-xs font-medium text-red-400">{keterangan}</p>
      </div>
    </div>
  );
}
